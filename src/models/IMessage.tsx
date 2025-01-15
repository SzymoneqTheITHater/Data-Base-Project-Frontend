import IChat from "./IChat";
import IUser from "./IUser";

export default interface IMessage {
    id: number;
    chat: IChat;
    sender: IUser;
    content: string;
    status: 'sent' | 'Viewed';
    createdAt: string; // ISO string for date
    viewedAt?: string | null; // Optional ISO string for date
}