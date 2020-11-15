import { IMessage } from 'react-native-gifted-chat';
import { crossAppNotification, EventsNames } from "../../config";
import { ResponseNodeLogic, ChatWorkflowNode, CategoryType, NavigateFunction, ShowModelFunction, QuickReply, Abilities} from "./common";
import { categories } from '../../constant';
import { PopupNode } from './nodes/PopupNode';

// add show image: uses interface for type checking
export interface ShowImage {
    imageURI: string | HTMLImageElement;
}

export class GreetingNode extends ResponseNodeLogic {
    async step(): Promise<boolean> {
        // console.log('Greeting: Hi Lisa');
        this.sendMessage(['Hi Lisa, where would you like me to start the session?']);
        return true;
    }
    getNextNode(): ChatWorkflowNode {
        return new DeviceChoiceUtteranceNode();
    }
}

// Users' Utterance - quickreply
export  class ChoiceUtteranceNode implements ChatWorkflowNode {
    control: string;
    abilities: Abilities;
    waitResult: Promise<any>;

    protected quickReplies: QuickReply[];
    protected questionKey: string;

    protected selected: QuickReply;

    constructor() {
        this.control = 'ask';
    }

    getNextNode(): ChatWorkflowNode {
        throw new Error('Method not implemented.');
    }

 //   abstract getNextNode(): ChatWorkflowNode;

    async step(): Promise<boolean> {
        if (this.control == 'ask') {
            // ask

            this.waitResult = this.abilities.showQuickReply(this.quickReplies, this.questionKey);

            this.control = 'waitReply';
            return false;
        } else if (this.control == 'waitReply') {
            this.selected = await this.waitResult;

            return true;
        }

        return true;
    }

    assignAbilities(abilities: Abilities): void {
        this.abilities = abilities;
    }

}

// const aaa = new ChoiceUtteranceNode(333);

export class DeviceChoiceUtteranceNode extends ChoiceUtteranceNode {
    constructor() {
        super();
        this.quickReplies = [{
            text: 'Alexa'
        },{
            text: 'Phone'
        }];

        this.questionKey = 'DeviceChoice';
    }

    getNextNode(): ChatWorkflowNode {
        console.log(this.selected);
        if (this.selected.text == 'Alexa') {
            return new AlexaSelectedNode();
        } else {
            return new PhoneSelectedNode();
        }
    }
}

// Choose Alexa
export class AlexaSelectedNode extends ResponseNodeLogic {
    async step(): Promise<boolean> {
        this.sendMessage(['Please say: Alexa, tell cocobot to start the {scheduled practice} session.']);
        return true;
    }
    getNextNode(): ChatWorkflowNode {
        return null;
    }
}

// Choose Phone && Show Resource
export class PhoneSelectedNode extends ResponseNodeLogic {
    control: string;
    playerdata: CategoryType;

    constructor() {
        super()
        this.control = 'showResource';

        let RandomIndex = Math.floor(Math.random() * 3 );
        // const playerdata = categories[RandomIndex];
        this.playerdata = categories[2];
        console.log(this.playerdata);
    }

    // control : 'showImage' => "waitForClick" -> "waitForFinish" -> "finish"    
    async step(): Promise<boolean> {
        // console.log("this.control", this.control);

        if (this.control == 'showResource') {
            this.sendMessage(['Okay! Please find a comfortable position and click the video below to start.']);
            this.sendResourceMessage();

            this.control = 'waitForClick';
            return false;
        } else if (this.control == 'waitForClick') {
            console.log("waitForClick");
            console.log('ResourcePlayStarted uncaptured');

            const waitForClickSingal = new Promise((resolve, reject) => {
                const subscription = crossAppNotification.addListener(EventsNames.ResourcePlayStarted, () => {
                    console.log('ResourcePlayStarted captured');
                    subscription.remove();
                    this.control = 'waitForFinish';
                    resolve();
                });
            });

            await waitForClickSingal;

            return false;
        } else if (this.control == 'waitForFinish') {
            console.log("control status", this.control);

            const waitForFinish = new Promise((resolve, reject) => {
                const subscription = crossAppNotification.addListener(EventsNames.ResourcePlayDone, () => {
                    console.log('ResourcePlayDone captured');        
                    this.control = 'finish';        
                    subscription.remove();

                    this.abilities.saveResourcePlayed(this.playerdata);
                    resolve();
                });
            });

            await waitForFinish;

            console.log("haha");
            return false;
        } else if (this.control == 'finish') {
            console.log("finish");

            return true;
        }
        return true;
    }

    sendResourceMessage() {
        const msgId = this.abilities.generateMsgId();
    
        const message = {
            _id: msgId,
            text: "",
            createdAt: new Date(),
            type: "ShowResource",
            data: this.playerdata,
            user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
            },
        };

        this.abilities.sendMessage([message]);
    }

    getNextNode(): ResponseNodeLogic {
        return new RatingNode(); // Will Replace by Rating
    }
}

// Show Rating After ResourceDone
export class RatingNode extends ResponseNodeLogic {

    control: string;
    rating: number;

    constructor() {
        super()
        this.control = 'ShowRating';
        // this.rating = 0;
    }

    // control : 'ShowRating' => "waitforRating" -> "Finish: <= 3 or > 3"   
    async step(): Promise<boolean> {
        console.log("this.control", this.control);
        if (this.control == 'ShowRating') {
            // this.sendMessage(['ShowRating']);
            this.sendRatingMessage();

            this.control = 'waitforRating';
            return false;
        } else if (this.control == 'waitforRating') {
            console.log("waitforRating");
            console.log('Rating uncaptured');

            const waitForClickSingal = new Promise((resolve, reject) => {
                const subscription = crossAppNotification.addListener(EventsNames.RatingDone, (rating) => {
                    console.log('Rating Result', rating)
                    console.log('Rating captured');
                    subscription.remove();
                    this.control = 'finish';
                    this.rating = rating;
                    resolve();
                });
            });
            await waitForClickSingal;
            console.log('Rating Captured');

            return false;
        } else if (this.control == 'finish') {
            console.log("finish");
            return true;
        }
    }

    sendRatingMessage() {
        const msgId = this.abilities.generateMsgId();
    
        const message = {
            _id: msgId,
            text: "",
            createdAt: new Date(),
            type: "ShowRating",
            user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
            },
        };

        this.abilities.sendMessage([message]);
    }

    getNextNode(): ResponseNodeLogic {

        console.log(this.rating);
        if (this.rating <= 3) {
            return new UnsatisfiedChatingNode();
        } else {
            return new SatisfiedChatingNode();
        }
    }

}

// Rating > 3
export class SatisfiedChatingNode extends ResponseNodeLogic {
    async step(): Promise<boolean> {
        this.sendMessage(['I’m glad you like the exercise! I will recommend similar exercises for you in the future!']);
        this.sendMessage(['Anything else I can help with you today,Lisa?']);
        return true;
    }
    getNextNode(): ChatWorkflowNode {
        return new SatisfiedFollowUpUtteranceNode();
    }
}

// Rating <= 3
export class UnsatisfiedChatingNode extends ResponseNodeLogic {
    async step(): Promise<boolean> {
        this.sendMessage(['Hmm, I see you did not like the exercise as much. Could you tell me why?']);
        this.sendSkipMessage();  // 
        return true;
    }

    sendSkipMessage() {
        const msgId = this.abilities.generateMsgId();
    
        const message = {
            _id: msgId,
            text: "",
            createdAt: new Date(),
            type: "SkipSession",
            user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
            },
        };

        this.abilities.sendMessage([message]);
    }

    getNextNode(): ChatWorkflowNode {
        return new UnsatisfiedFollowUpUtteranceNode();
    }
}

// Rating > 3  => Provide follow up question answer
export class SatisfiedFollowUpUtteranceNode extends ChoiceUtteranceNode {
    constructor() {
        super();
        this.quickReplies = [{
            text: 'Practice again now'
        },{
            text: 'Explore other resources'
        },{
            text: 'End this session'
        },];

        this.questionKey = 'SatisfiedFollowUp';
    }

    getNextNode(): ChatWorkflowNode {
        console.log(this.selected);
        if (this.selected.text == 'Practice again now') {
            return new PracticeAgainNode();
        } else if (this.selected.text == 'Explore other resources'){
            return new ExploreOtherNode();
        } else if (this.selected.text == 'End this session'){
            return new EndChatingSessionNode();
        }
        
    }
}

// Rating <= 3  => Provide follow up question answer -----
export class UnsatisfiedFollowUpUtteranceNode extends ChoiceUtteranceNode {
    constructor() {
        super();
        this.quickReplies = [{
            text: 'Why'
        }];

        this.questionKey = 'UnsatisfiedFollowUp';
    }

    getNextNode(): ChatWorkflowNode {
        if (this.selected.text == 'Why') {
            return new PracticeAgainNode();
        } 
    }
}

// Navigate to Player page and Play Again 
export class PracticeAgainNode extends ResponseNodeLogic {
    control: string;

    constructor() {
        super();
        this.control = 'start';
    }
    
    async step(): Promise<boolean> {

        if (this.control == 'start') {
            const playedResource = this.abilities.getResourcePlayed();
            const { type, name, author, audiouri, pictureuri: backgroundImage } = playedResource;

            this.abilities.navigate("ContentDetails", {data: {
                type, name, author, audiouri, backgroundImage
            }});

            this.control = 'wait';
            return false;
        } else if (this.control == 'wait') {
            const waitForFinish = new Promise((resolve, reject) => {
                const subscription = crossAppNotification.addListener(EventsNames.ResourcePlayDone, () => {
                    console.log('ResourcePlayDone captured');        
                    subscription.remove();
                    resolve();
                });
            });

            await waitForFinish;
            this.control = 'end';        

            return false;
        }

        return true;     
    }
    getNextNode(): ChatWorkflowNode {
        return new EndChatingSessionNode();
    }
}

// Navigate to Resource page and End Session 
export class ExploreOtherNode extends ResponseNodeLogic {
    
    // control: string;

    // constructor() {
    //     super();
    //     this.control = 'start';
    // }
    
    async step(): Promise<boolean> {

        // if (this.control == 'start') {
            console.log("go to resources page")
            this.abilities.navigate("Resources", ()=>{});
            this.sendEndMessage();
            // this.control = 'wait';
        // }
        return true; 
    }

    sendEndMessage() {
        const msgId = this.abilities.generateMsgId();
    
        const message = {
            _id: msgId,
            text: "",
            createdAt: new Date(),
            type: "EndSession",
            user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
            },
        };

        this.abilities.sendMessage([message]);
    }

    getNextNode(): ChatWorkflowNode {
        return null;
    }
}

// End Session
export class EndChatingSessionNode extends ResponseNodeLogic {

    control: string;
    constructor() {
        super()
        this.control = 'EndSession';
    }

    async step(): Promise<boolean> {
        this.sendMessage(['Okay, hope to see you soon!']);
        this.sendEndMessage();
        return true;
    }

    sendEndMessage() {
        const msgId = this.abilities.generateMsgId();
    
        const message = {
            _id: msgId,
            text: "",
            createdAt: new Date(),
            type: "EndSession",
            user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
            },
        };

        this.abilities.sendMessage([message]);
    }


    getNextNode(): ChatWorkflowNode {
        return new PopupNode();
    }
}

export class WrongAnswerNode extends ResponseNodeLogic {
    async step(): Promise<boolean> {
        this.sendMessage(['Hu shuo ba dao.']);

        return true;
    }
    getNextNode(): ChatWorkflowNode {
        return null;
    }
}

// Run workflow
export class WorkflowRunner {
    stepId: number;
    node: ChatWorkflowNode;
    sendMessageFunc: (messages: IMessage[]) => void
    navigateFunc: NavigateFunction;
    showModalFunc: ShowModelFunction;
    messageId: number;
    control: string;

    quickReplyMessages: {
        [msgId: string]: {
            options: QuickReply[],
            questionKey: string,
            selectionResolver: (value: any) => void;
            selection: Promise<string>
        }
    }

    questionAnswer: {
        [questionId: string]: QuickReply
    }

    resourcePlayed: CategoryType;

    constructor(firstNode: ChatWorkflowNode, sendMessage: (messages: IMessage[]) => void, 
        navigate: NavigateFunction, showModal: any) {
        this.node = firstNode;
        this.stepId = 0;
        this.sendMessageFunc = sendMessage;
        this.navigateFunc = navigate;
        this.showModalFunc = showModal;
        this.messageId = 1;
        this.quickReplyMessages = {};
        this.questionAnswer = {};
        
        // this.showResourceImage = {}; // show resource image

        this.assignNodeAbiilities(this.node);
    }

    async run(): Promise<number> {
        this.stepId++;

        if (!this.node) {
            return null;
        }

        const isFinished = await this.node.step();

        if (isFinished) {
            const nextNode = this.node.getNextNode();
            this.node = nextNode;
            if (!!this.node) {
                this.assignNodeAbiilities(this.node);
            }
        }

        return this.stepId;
    }

    generateMsgId(): number {
        const msgId = this.messageId;
        this.messageId++;
        
        return msgId;
    }

    assignNodeAbiilities(node: ChatWorkflowNode): void {
        node.assignAbilities({
            sendMessage : this.sendMessageFunc,
            navigate: this.navigateFunc,
            showModal: this.showModalFunc,
            generateMsgId: () => {
                return this.generateMsgId();
            },

            showQuickReply: (quickReplies: QuickReply[], questionKey) => {
                const msgId = this.generateMsgId();

                const message = {
                    _id: msgId,
                    text: '',
                    createdAt: new Date(),
                    user: {
                      _id: 1,
                      name: 'React Native',
                      avatar: 'https://placeimg.com/140/140/any',
                    },
                    type: "QuickReply",
                    quickReplies: {
                      type: 'radio' as any,
                      keepIt: true,
                      values: quickReplies.map(quickReply => {
                        let label =  quickReply.text;
                        return {
                          title: label,
                          value: label
                        }
                    })
                    }
                };

                this.quickReplyMessages[msgId] = {
                    options: quickReplies,
                    questionKey,
                    selectionResolver: undefined,
                    selection: undefined
                }

                const replyResultPromise = new Promise<string>((resolve) => {
                    this.quickReplyMessages[msgId].selectionResolver = resolve;
                });

                this.quickReplyMessages[msgId].selection = replyResultPromise;
                

                this.sendMessageFunc([message]);

                return replyResultPromise;
            },

            saveResourcePlayed: (playerdata: CategoryType) => {
                this.resourcePlayed = playerdata;
            },

            getResourcePlayed: (): CategoryType => {
                return this.resourcePlayed;
            }
        });
    }


    onQuickReply(selection: Array<{
        title: string;
        value: any,
        messageId: string
    }>): {
        msgId: string,
        selection: string  
    } {
        const choice = selection[0];
        const msgId = choice.messageId;

        const msgInfo = this.quickReplyMessages[msgId];
        const selected = msgInfo.options.filter(option => option.text == choice.value)[0];
        msgInfo.selectionResolver(selected);


        this.questionAnswer[msgInfo.questionKey] = selected;

        return  {
            msgId,
            selection: selected.text
        }
    }

}

