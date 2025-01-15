import IListing from "./IListing";
import IUser from "./IUser";

export default interface IReview {
    id: number;
    listing: IListing;
    reviewer: IUser;
    reviewee: IUser;
    rating: number;
    comment: string;
    createdAt: string; // ISO string for date
}