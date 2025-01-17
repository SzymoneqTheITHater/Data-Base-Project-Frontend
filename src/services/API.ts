"use client";

import { IChatResponse } from "@/models/IChat";
import IDjangoResponse from "@/models/IDjangoResponse";
import IListing, { IListingRequest, IListingResponse, IListingsResponse } from "@/models/IListing";
import { IMessageResponse } from "@/models/IMessage";
import { ITransactionRequest, ITransactionResponse, ITransactionsResponse, IUpdateTransactionRequest } from "@/models/ITransaction";
import { INewUserRequest } from "@/models/IUser";

export default class API {
    static apiUrl: string = "http://127.0.0.1:8000";

    private static async post(accessToken: string | undefined, url: string, body?: object) {
        const bodyString: string | undefined = body ? JSON.stringify(body) : undefined;
        const headers: [string, string][] = [["Content-Type", "application/json"]];
        if (accessToken) {
            headers.push(["Authorization", "Bearer " + accessToken]);
        }

        try {
            const res = await fetch(url, {
                method: 'POST',
                body: bodyString,
                headers: headers
            });
            const resJson = await res.json();
            return resJson;
        } catch (error) {
            console.error("Failed to post: ", error);
            throw error;
        }
    }

    private static async get(accessToken: string | undefined, url: string) {
        try {
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                },
            });
            const resJson = await res.json();
            return resJson;
        } catch (error) {
            console.error("Failed to get: ", error);
            throw error;
        }
    }

    private static async patch(accessToken: string | undefined, url: string, body?: object) {
        const bodyString: string | undefined = body ? JSON.stringify(body) : undefined;
        try {
            const res = await fetch(url, {
                method: 'PATCH',
                body: bodyString,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                },
            });
            const resJson = await res.json();
            return resJson;
        } catch (error) {
            console.error("Failed to get: ", error);
            throw error;
        }
    }

    static getChat(accessToken: string, listingId: number) {
        return this.get(accessToken, this.apiUrl + "/chats/" + listingId);
    }
    static getChats(accessToken: string): Promise<IDjangoResponse<IChatResponse>> {
        return this.get(accessToken, this.apiUrl + "/chats/");
    }
    static createChat(accessToken: string, listing_id: number, buyer_id: number) {
        return this.post(accessToken, this.apiUrl + "/chats/create/", { listing_id, buyer_id });
    }
    static getMessages(accessToken: string, chatId: number): Promise<IMessageResponse[]> {
        return this.get(accessToken, this.apiUrl + "/messages/" + chatId);
    }
    static sendMessageToChat(accessToken: string, listingId: number, chatId: number, content: string, user_id: number): Promise<IMessageResponse> {
        return this.post(accessToken, this.apiUrl + "/addmessage/" + listingId + '/' + chatId, { content, user_id });
    }
    static getListings(): Promise<IListingsResponse> {
        return this.get(undefined, this.apiUrl + "/");
    }
    static addListing(accessToken: string, listing: IListingRequest): Promise<IListingResponse> {
        return this.post(accessToken, this.apiUrl + "/listings/create/", listing);
    }
    static createUser(data: INewUserRequest) {
        return this.post(undefined, this.apiUrl + "/signup/", data);
    }
    static getTransactions(accessToken: string): Promise<ITransactionsResponse> {
        return this.get(accessToken, this.apiUrl + "/transactions_all/");
    }
    static createTransaction(accessToken: string, data: ITransactionRequest): Promise<ITransactionResponse> {
        return this.post(accessToken, this.apiUrl + "/transactions/", data);
    }
    static updateTransaction(accessToken: string, transactionId: number, data: IUpdateTransactionRequest) {
        return this.patch(accessToken, this.apiUrl + "/transactions/" + transactionId + "/update/", data);
    }
}