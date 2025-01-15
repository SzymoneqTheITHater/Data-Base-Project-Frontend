import { User } from "@/components/getUserData";
import IListing from "./IListing";
import IUser from "./IUser";

interface ITransaction {
    id: number;
    listing: IListing;
    seller: IUser;
    buyer: User;
    transactionDate: string; // ISO string for date
    status: 'pending' | 'completed' | 'cancelled';
}