import IUser from "./IUser";

export default interface IAddress {
    id: number;
    country: string;
    town: string;
    street: string;
    postalCode: number;
    buildingNumber: number;
    resident: IUser | null;
}