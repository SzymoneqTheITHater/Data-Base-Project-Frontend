import IListing from "./models/IListing"
import IUser from "./models/IUser"

export const testSeller: IUser = {
    id: 0,
    username: "Maciek",
    email: "maciek@"
}

export const testListings: IListing[] = [
    {
        id: 0,
        title: "Title",
        description: "Desc",
        price: 0,
        location: "",
        seller: testSeller,
        isActive: false,
        category: null,
        createdAt: "",
        state: "active"
    }
]