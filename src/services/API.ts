"use client";

import { useUser } from "@/components/getUserData";
import IListing, { IListingRequest } from "@/models/IListing";

export default class API {
    static apiUrl: string = "http://127.0.0.1:8000";

    private static async post(url: string, body?: object) {
        const { accessToken } = useUser();
        const bodyString: string | undefined = body ? JSON.stringify(body) : undefined;

        try {
            const res = await fetch(url, {
                method: 'POST',
                body: bodyString,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                },
            });
            const resJson = await res.json();
            return resJson;
        } catch (error) {
            console.error("Failed to post: ", error);
            throw error;
        }
    }

    private static async get(url: string) {
        const { accessToken } = useUser();

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

    static getChat(listingId: number) {
        return this.post(this.apiUrl + "/chats/" + listingId);
    }
    static getMessages(chatId: number) {
        return this.post(this.apiUrl + "/messages/" + chatId);
    }
    static sendMessage(listingId: number, chatId: number, content: string) {
        return this.post(this.apiUrl + "/addmessage/" + listingId + '/' + chatId, { content });
    }
    static addListing(listing: IListingRequest) {
        return this.post(this.apiUrl + "/listings/create/", listing);
    }
}