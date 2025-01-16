import IListing from "./IListing";
import IUser from "./IUser";

export default interface IChat {
    id: number;
    buyer: IUser;
    seller: IUser;
    listing: IListing;
}