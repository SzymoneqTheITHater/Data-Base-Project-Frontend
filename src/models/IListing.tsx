import ICategory from "./ICategory";
import IUser from "./IUser";

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
    state: 'active' | 'bought' | 'pending' | 'cancelled';
    image?: string; // URL to the image
}