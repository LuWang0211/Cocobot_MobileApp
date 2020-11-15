import { IMessage } from 'react-native-gifted-chat';
import { categories } from '../../constant';


export type CategoryType = typeof categories[0];
export type NavigateFunction = (event: string, params: any) => void;
export type ShowModelFunction = (content: JSX.Element, title: string, onClose: () => void) => void;

export interface QuickReply {
    text: string;
}


export type Abilities =  {
    sendMessage: (messages: IMessage[]) => void;
    generateMsgId: () => number;

    // showResourceImage: (image: ShowImage[])  => Promise<any>;
    showQuickReply: (quickReplies: QuickReply[], questionKey: string) => Promise<any>;

    saveResourcePlayed: (playerData: CategoryType) => void;
    getResourcePlayed: () => CategoryType;
    navigate: NavigateFunction;
    showModal: ShowModelFunction;
};


export interface ChatWorkflowNode {
    step(): Promise<boolean>;

    getNextNode(): ChatWorkflowNode;

    assignAbilities(abilities: Abilities): void;

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