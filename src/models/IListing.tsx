import ICategory from "./ICategory";
import IDjangoResponse from "./IDjangoResponse";
import IUser from "./IUser";
import { TState } from "./TState";

export default interface IListing {
    id: number;
    title: string;
    description: string;
    price: number;
    location: string;
    seller: IUser;
    isActive: boolean;
    category: ICategory | null;
    createdAt: string; // ISO string for date
    state: TState;
    image?: string; // URL to the image
}

export interface IListingRequest extends Pick<IListing, 'title' | 'description' | 'price' | 'location'> {
    seller: number,
}

export interface IListingResponse {
    title: string,
    description: string,
    price: number,
    location: string,
    created_at: string,
    category: any, // TODO
    isActive: boolean;
    id: number,
    state: string,
    image: any, // TODO
    seller: number,
}

export interface IListingsResponse extends IDjangoResponse<IListingResponse> { }