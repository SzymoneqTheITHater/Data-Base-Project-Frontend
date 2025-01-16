import { User } from "@/components/getUserData";
import IListing from "./IListing";
import IUser from "./IUser";
import { TStatus } from "./TStatus";
import IDjangoResponse from "./IDjangoResponse";

export interface ITransaction {
    id: number;
    listing: IListing;
    seller: IUser;
    buyer: User;
    transactionDate: string; // ISO string for date
    status: 'pending' | 'completed' | 'cancelled';
}

export interface ITransactionRequest {
    listing: number,
    //user: number,
}

export interface ITransactionResponse {
    buyer: number,
    seller: number,
    id: number,
    listing: number,
    status: TStatus,
    transaction_date: string,
}

export interface IUpdateTransactionRequest {
    status: TStatus,
    user: number
}

export interface ITransactionsResponse extends IDjangoResponse<ITransactionResponse> { }