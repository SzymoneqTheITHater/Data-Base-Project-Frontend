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

export interface IReviewResponse {
    id: number;
    listing: number;
    reviewer: number;
    reviewee: number;
    rating: number;
    comment: string;
    createdAt: string; // ISO string for date
}

export interface IReviewRequest {
    listing: number,
    reviewee: number,
    reviewer: number,
    comment: string,
    rating: string,
}