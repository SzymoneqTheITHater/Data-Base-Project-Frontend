export default interface IUser {
    id: number;
    username: string;
    email: string;
}

export interface INewUserRequest {
    username: string,
    email: string,
    password: string,
}