import IChat from "./models/IChat"
import IListing from "./models/IListing"
import IMessage from "./models/IMessage"
import IUser from "./models/IUser"

const user1: IUser = {
    id: 0,
    username: "Maciek",
    email: "maciek@"
}
const user2: IUser = {
    id: 1,
    username: "Szymon",
    email: "szy@"
}

const listing1: IListing = {
    id: 0,
    title: "Title",
    description: "Desc",
    price: 0,
    location: "",
    seller: user1,
    isActive: false,
    category: null,
    createdAt: "",
    state: "active"
}

const listings: IListing[] = [listing1];

const chat1: IChat = {
    id: 0,
    buyer: user1,
    seller: user2,
    listing: listing1
}

const chat1mes1: IMessage = {
    id: 0,
    chat: chat1,
    sender: user1,
    content: "Hej",
    status: "sent",
    createdAt: ""
}
const chat1mes2: IMessage = {
    id: 1,
    chat: chat1,
    sender: user2,
    content: "zegnam",
    status: "sent",
    createdAt: ""
}

const chat1messages: IMessage[] = [chat1mes1, chat1mes2]

export default {
    user1,
    user2,
    listings,
    listing1,
    chat1,
    chat1messages,
};