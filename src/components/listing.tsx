"use client";

import IListing from "@/models/IListing";
import { Button, Card, Input, Skeleton, Stack } from "@chakra-ui/react";
import { DrawerBody, DrawerCloseTrigger, DrawerContent, DrawerFooter, DrawerHeader, DrawerRoot, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { Field } from "./ui/field";
import React from "react";
import API from "@/services/API";
import IMessage, { IMessageResponse } from "@/models/IMessage";
import { IChatResponse } from "@/models/IChat";
import { useUser } from "./getUserData";
import { DataListItem, DataListRoot } from "./ui/data-list";
import { EmptyState } from "./ui/empty-state";
import { LuAnnoyed } from "react-icons/lu";

interface IProps extends IListing {
    onBuy(listingId: number): any,
}

export default function Listing(props: IProps) {
    const [messages, setMessages] = React.useState<IMessageResponse[]>();
    const [chat, setChat] = React.useState<IChatResponse>();
    const [chatExists, setChatExists] = React.useState<boolean>();

    const { user, accessToken } = useUser();

    const messageRef = React.useRef<HTMLInputElement>(null);

    const onSend = () => {
        if (messageRef.current && user && accessToken) {
            const content: string = messageRef.current.value;
            let promise: Promise<void> = Promise.resolve();
            if (!chat) {
                promise = API.createChat(accessToken, props.id, user.id)
                    .then(res => {
                        const chat: IChatResponse = {
                            id: res.id,
                            buyer: user.id,
                            seller: props.seller.id,
                            listing: props.id
                        }
                        setChat(chat);
                    });
            }

            promise.then(() => {
                if (chat) {
                    return API.sendMessageToChat(accessToken, props.id, chat.id, content, user.id)
                        .then(message => {
                            const newMessages: IMessageResponse[] = (messages || []).concat(message);
                            setMessages(newMessages);
                        });
                }
            })
        }
    }

    /** Proofs if a chat exists. */
    const onContact = () => {
        if (accessToken) {
            API.getChat(accessToken, props.id)
                .then((res: IChatResponse[]) => {
                    if (res.length !== 0) {
                        const chat: IChatResponse = res[0];
                        setChatExists(true);
                        setChat(chat);

                        API.getMessages(accessToken, chat.id)
                            .then(messages => {
                                setMessages(messages);
                            })
                    } else {
                        setChatExists(false);
                    }
                });
        }
    }

    const { id, title, description, price, location } = props;
    return (
        <Card.Root variant={'elevated'}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <DataListRoot>
                    <DataListItem key='description' label='Description' value={description} />
                    <DataListItem key='price' label='Price' value={price} />
                    <DataListItem key='location' label='Location' value={location} />
                </DataListRoot>
            </Card.Body>
            <Card.Footer>
                <Button color={"blue.600"} variant={'surface'} onClick={() => props.onBuy(id)}>Buy</Button>
                <DrawerRoot>
                    <DrawerTrigger asChild>
                        <Button color={"blue.600"} variant={'surface'} onClick={onContact}>Contact</Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle color={'black'}>
                                Chat
                            </DrawerTitle>
                        </DrawerHeader>
                        <DrawerCloseTrigger />
                        <DrawerBody>
                            <Stack>
                                {
                                    chatExists === undefined ?
                                        <>
                                            <Skeleton height={50} />
                                            <Skeleton height={50} />
                                            <Skeleton height={50} />
                                        </>
                                        :
                                        (!chatExists || messages?.length === 0 ?
                                            <EmptyState
                                                icon={<LuAnnoyed />}
                                                title="No messages"
                                                description="Begin a great conversation now!"
                                            />
                                            :
                                            messages?.map(message => (
                                                <Card.Root variant={'subtle'}>
                                                    <Card.Body backgroundColor={message.sender === user?.id ? 'teal.200' : undefined}>
                                                        <Card.Title>Author</Card.Title>
                                                        <Card.Description>{message.content}</Card.Description>
                                                        <Card.Footer>{new Intl.DateTimeFormat().format(new Date())}</Card.Footer>
                                                    </Card.Body>
                                                </Card.Root>
                                            ))
                                        )
                                }
                            </Stack>
                        </DrawerBody>
                        <DrawerFooter>
                            <Field label="Message" color={'black'}>
                                <Input ref={messageRef} variant={'subtle'} />
                            </Field>
                            <Button variant={'surface'} onClick={onSend} color={'black'}>Send</Button>
                        </DrawerFooter>
                    </DrawerContent>
                </DrawerRoot>
            </Card.Footer>
        </Card.Root>
    )
}