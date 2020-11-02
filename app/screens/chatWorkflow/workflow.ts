import { IMessage } from 'react-native-gifted-chat';

type Abilities =  {
    sendMessage: (messages: IMessage[]) => void;
    generateMsgId: () => number;
};

export interface ChatWorkflowNode {
    step(): boolean;

    getNextNode(): ChatWorkflowNode;

    assignAbilities(abilities: Abilities): void;
}


export abstract class ResponseNodeLogic implements ChatWorkflowNode {
    abilities: Abilities;

    abstract step(): boolean;

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
            user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
                // avatar: '../assets/coco.png',
            },
        };

        this.abilities.sendMessage([message]);
    }
}


export class GreetingNode extends ResponseNodeLogic {
    step(): boolean {
        // console.log('Hi Lisa, where do you want to do it?');
        this.sendMessage(['Hi Lisa, where do you want to do it?']);

        return true;
    }
    getNextNode(): ChatWorkflowNode {
        return new Greeting2Node();
    }
}

export class Greeting2Node extends ResponseNodeLogic {
    step(): boolean {
        // console.log('Hi wo shi sha sha bao.')
        this.sendMessage(['Hi wo shi sha sha bao.']);

        return true;
    }
    getNextNode(): ChatWorkflowNode {
        return null;
    }
}



export class WorkflowRunner {
    stepId: number;
    node: ChatWorkflowNode;
    sendMessageFunc: (messages: IMessage[]) => void
    messageId: number;

    constructor(firstNode: ChatWorkflowNode, sendMessage: (messages: IMessage[]) => void) {
        this.node = firstNode;
        this.stepId = 0;
        this.sendMessageFunc = sendMessage;
        this.messageId = 1;

        this.assignNodeAbiilities(this.node);
    }

    run(): number {
        this.stepId++;

        if (!this.node) {
            return null;
        }

        const isFinished = this.node.step();

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
            }
        });
    }

}

