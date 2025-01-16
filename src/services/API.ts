"use client";

import IListing, { IListingRequest, IListingResponse } from "@/models/IListing";
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
                method: 'POST',
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
        return this.post(accessToken, this.apiUrl + "/chats/" + listingId);
    }
    static getMessages(accessToken: string, chatId: number) {
        return this.post(accessToken, this.apiUrl + "/messages/" + chatId);
    }
    static sendMessage(accessToken: string, listingId: number, chatId: number, content: string) {
        return this.post(accessToken, this.apiUrl + "/addmessage/" + listingId + '/' + chatId, { content });
    }
    static getListings(): Promise<IListing[]> {
        return this.get(undefined, this.apiUrl + "/");
    }
    static addListing(accessToken: string, listing: IListingRequest): Promise<IListingResponse> {
        return this.post(accessToken, this.apiUrl + "/listings/create/", listing);
    }
    static createUser(data: INewUserRequest) {
        return this.post(undefined, this.apiUrl + "/signup/", data);
    }
}