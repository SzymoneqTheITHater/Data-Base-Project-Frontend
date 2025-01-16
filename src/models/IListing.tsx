import ICategory from "./ICategory";
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