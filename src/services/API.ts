"use client";

import IListing, { IListingRequest, IListingResponse, IListingsResponse } from "@/models/IListing";
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
    static getChats(accessToken: string) {
        return this.get(accessToken, this.apiUrl + "/chats/");
    }
    static startNewChat(accessToken: string, listingId: number, senderId: number, content: string) {
        return this.post(accessToken, this.apiUrl + "/addmessage/" + listingId, { content, sender_id: senderId });
    }
    static getMessages(accessToken: string, chatId: number) {
        return this.post(accessToken, this.apiUrl + "/messages/" + chatId);
    }
    static sendMessageToChat(accessToken: string, listingId: number, chatId: number, content: string) {
        return this.post(accessToken, this.apiUrl + "/addmessage/" + listingId + '/' + chatId, { content });
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