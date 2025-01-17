import IListing from "./IListing";
import IUser from "./IUser";

export default interface IChat {
    id: number;
    buyer: IUser;
    seller: IUser;
    listing: IListing;
}

export interface IChatResponse {
    id: number;
    buyer: number;
    seller: number;
    listing: number;
}