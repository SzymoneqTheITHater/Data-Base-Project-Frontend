import { IChatResponse } from "./IChat";
import IUser from "./IUser";

export default interface IMessage {
    id: number;
    chat: IChatResponse;
    sender: IUser;
    content: string;
    status: 'sent' | 'Viewed';
    createdAt: string; // ISO string for date
    viewedAt?: string | null; // Optional ISO string for date
}

export interface IMessageResponse {
    id: number;
    chat: number;
    sender: number;
    content: string;
    status: 'sent' | 'Viewed';
    createdAt: string; // ISO string for date
    viewedAt?: string | null; // Optional ISO string for date

}