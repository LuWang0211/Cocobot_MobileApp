import { IMessage } from 'react-native-gifted-chat';
import { Value } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { ChatRating } from '../../components/ChatComponents/ChatWidgets/ChatWidgets';
import { crossAppNotification, EventsNames } from "../../config";

type Abilities =  {
    sendMessage: (messages: IMessage[]) => void;
    generateMsgId: () => number;

    showResourceImage: (image: ShowImage[])  => Promise<any>;
    showQuickReply: (quickReplies: QuickReply[], questionKey: string) => Promise<any>;
};

export interface ChatWorkflowNode {
    step(): Promise<boolean>;

    getNextNode(): ChatWorkflowNode;

    assignAbilities(abilities: Abilities): void;

}

export interface QuickReply {
    text: string;
}

// add show image: uses interface for type checking
export interface ShowImage {
    imageURI: string | HTMLImageElement;
}

export abstract class ResponseNodeLogic implements ChatWorkflowNode {
    abilities: Abilities;

    abstract step(): Promise<boolean>;

    abstract getNextNode(): ChatWorkflowNode;

    assignAbilities(abilities: Abilities) {
        this.abilities = abilities;
    }

    sendMessage(messages: string[] | string) {
        let messageText: string;

        if (messages instanceof Array) {
            messageText = messages[Math.floor(Math.random() * messages.length)];
        } else {
            messageText = messages;
        }

        const msgId = this.abilities.generateMsgId();
    
        const message = {
            _id: msgId,
            text: messageText,
            createdAt: new Date(),
            type: "ResponseNode",
            user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
            },
        };

        this.abilities.sendMessage([message]);
    }
}

export class GreetingNode extends ResponseNodeLogic {
    async step(): Promise<boolean> {
        // console.log('Greeting: Hi Lisa');
        this.sendMessage(['Hi Lisa, where would you like me to start the session?']);
        return true;
    }
    getNextNode(): ChatWorkflowNode {
        return new DeviceChoiceUteranceNode();
    }
}

// Users' Uterance - quickreply
export abstract class ChoiceUteranceNode implements ChatWorkflowNode {
    control: string;
    abilities: Abilities;
    waitResult: Promise<any>;

    protected quickReplies: QuickReply[];
    protected questionKey: string;

    protected selected: QuickReply;

    constructor() {
        this.control = 'ask';
    }

    abstract getNextNode(): ChatWorkflowNode;

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

export class DeviceChoiceUteranceNode extends ChoiceUteranceNode {
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

// Choose Phone
export class PhoneSelectedNode extends ResponseNodeLogic {
    async step(): Promise<boolean> {
        this.sendMessage(['Okay! Please find a comfortable position and click the video below to start.']);
        return true;
    }
    getNextNode(): ChatWorkflowNode {
        return new ShowDefaultResourceNode(); // rat
    }
}

export abstract class ShowResourceNode implements ChatWorkflowNode {
    // control : 'showImage' => "waitForClick" -> "waitForFinish" -> "finish"
    
    control: string;
    abilities: Abilities;
    waitResult: Promise<any>;

    protected Image: ShowImage[];

    constructor() {
        this.control = 'showResource';
    }

    abstract getNextNode(): ResponseNodeLogic;

    async step(): Promise<boolean> {
        
        console.log("phone prompt this.control", this.control);
        if (this.control == 'showResource') {
            this.waitResult = this.abilities.showResourceImage(this.Image);
            
            this.control = 'waitForClick';
            return false;
        } else if (this.control == 'waitForClick') {
            console.log("waitForClick");
            setTimeout(() => {      
                const subscription = crossAppNotification.addListener(EventsNames.ResourcePlayDone, () => {
                console.log('ResourcePlayDone captured');
        
                this.control = 'waitForFinish';
        
                subscription.remove();
                });

            }, 5000);
            console.log("haha");
            this.Image = await this.waitResult;
            /*
            listening("complete", () => {
                // control -> finish
            });

            navigate();
            */
            // this.control = 'waitForFinish';
            return false;
        } else if (this.control == 'waitForFinish') {
            console.log("waitForFinish");
            this.Image = await this.waitResult;
            this.control = 'finish';
            return false;
        } else if (this.control == 'finish') {
            console.log("finish");
            return false;
        }

        return true;
    }
    assignAbilities(abilities: Abilities): void {
        this.abilities = abilities;
    }

}



export class ShowDefaultResourceNode extends ShowResourceNode {
    constructor() {
        super();
        this.Image = [];
    }
    getNextNode(): ResponseNodeLogic {
        console.log("Rating");
        return new Greeting2Node(); // Rating
    }
}

export class BaobaoCuteUteranceNode extends ChoiceUteranceNode {
    constructor() {
        super();
        this.quickReplies = [{
            text: 'Baobao is cute'
        },{
            text: 'Baobao not cute'
        }];

        this.questionKey = 'BaobaoCuteness';
    }

    getNextNode(): ChatWorkflowNode {
        console.log(this.selected);
        if (this.selected.text == 'Baobao is cute') {
            return new Greeting2Node();
        } else {
            return new WrongAnswerNode();
        }
        
    }
}

export class Greeting2Node extends ResponseNodeLogic {
    async step(): Promise<boolean> {
        this.sendMessage(['Hi wo shi guai bao bao.']);

        return true;
    }
    getNextNode(): ChatWorkflowNode {
        return null;
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
    messageId: number;

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

    showResourceImage: {
        [msgId: string]: {
            options: ShowImage[],
            selectionResolver: (value: any) => void;
            selection: Promise<string>
        }
    }

    constructor(firstNode: ChatWorkflowNode, sendMessage: (messages: IMessage[]) => void) {
        this.node = firstNode;
        this.stepId = 0;
        this.sendMessageFunc = sendMessage;
        this.messageId = 1;
        this.quickReplyMessages = {};
        this.questionAnswer = {};
        
        this.showResourceImage = {}; // show resource image

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

            showResourceImage: (image: ShowImage[]) => {
                console.log("showResourceImage");
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
                    type: "ShowResource",
                    imageURI: 'https://reactnative.dev/img/tiny_logo.png',
                };

                this.showResourceImage[msgId] = {
                    options: image,
                    selectionResolver: undefined,
                    selection: undefined
                }

                const replyResultPromise = new Promise<string>((resolve) => {
                    this.showResourceImage[msgId].selectionResolver = resolve;
                });

                this.showResourceImage[msgId].selection = replyResultPromise;
                

                this.sendMessageFunc([message]);

                return replyResultPromise;
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

