"use client";

import IListing from "@/models/IListing";
import { Button, Card, Input, Skeleton, Stack } from "@chakra-ui/react";
import { DrawerBackdrop, DrawerBody, DrawerCloseTrigger, DrawerContent, DrawerFooter, DrawerHeader, DrawerRoot, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { Field } from "./ui/field";
import React from "react";
import API from "@/services/API";
import mockData from "@/mockData";
import IMessage from "@/models/IMessage";
import IChat from "@/models/IChat";
import { useUser } from "./getUserData";

interface IProps extends IListing {
}

export default function Listing(props: IProps) {
    const [messages, setMessages] = React.useState<IMessage[]>();
    const [chat, setChat] = React.useState<IChat>();
    const [chatExists, setChatExists] = React.useState<boolean>();

    const { user } = useUser();

    const messageRef = React.useRef<HTMLInputElement>(null);

    const onSend = () => {
        if (messageRef.current && chat !== undefined && user) {
            const content: string = messageRef.current.value;
            //API.sendMessage(props.id, chatId, content)

            return new Promise<void>((resolve, reject) => {
                setTimeout(() => {
                    const newMessage: IMessage = {
                        id: 5,
                        chat,
                        sender: user,
                        content,
                        status: "sent",
                        createdAt: new Date().toISOString()
                    }
                    const newMessages: IMessage[] = (messages || []).concat(newMessage);
                    setMessages(newMessages);
                    resolve();
                }, 2000);
            })
        }
    }

    const onContact = () => {
        /*         API.getChat(props.id)
                    .then(res => {
                    })
         */
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                if (true) {
                    setChatExists(true);
                    setChat(mockData.chat1);

                    //API.getMessages(mockData.chat1.id)
                    setMessages(mockData.chat1messages);
                    resolve()
                } else {
                    setChatExists(false);
                }

            }, 2000);
        })
    }

    const { title, description } = props;
    return (
        <Card.Root variant={'elevated'}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Description>{description}</Card.Description>
            </Card.Body>
            <Card.Footer>
                <Button color={"blue.600"} variant={'surface'}>Buy</Button>
                <DrawerRoot>
                    <DrawerBackdrop />
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
                                        (!chatExists ?
                                            "You are beginning a new conversation."
                                            :
                                            messages?.map(message => (
                                                <Card.Root variant={'subtle'}>
                                                    <Card.Body backgroundColor={message.sender.id === 1 ? 'teal.200' : undefined}>
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