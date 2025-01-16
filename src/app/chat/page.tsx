"use client";

import { useUser } from "@/components/getUserData";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import mockData from "@/mockData";
import IChat from "@/models/IChat";
import IMessage from "@/models/IMessage";
import { Card, Container, DrawerBackdrop, DrawerBody, DrawerCloseTrigger, DrawerContent, DrawerFooter, DrawerHeader, DrawerOpenChangeDetails, DrawerRoot, DrawerTitle, DrawerTrigger, Input, Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

export default function Page() {
  const { user } = useUser();

  const [chats, setChats] = React.useState<IChat[]>();
  const [selectedChatIndex, setSelectedChatIndex] = React.useState<number>();
  const [messages, setMessages] = React.useState<IMessage[]>();
  const [isSendButtonLoading, setIsSendButtonLoading] = React.useState<boolean>(false);
  const buyChats: IChat[] = chats?.filter(chat => chat.buyer.id === user?.id) || [];
  const sellChats: IChat[] = chats?.filter(chat => chat.seller.id === user?.id) || [];

  const messageRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setTimeout(() => {
      const { chat1, chat2 } = mockData;
      setChats([chat1, chat2]);
    }, 2000);
  }, []);

  const onOpenChat = (chatIndex: number) => {
    setTimeout(() => {
      if (chats) {
        //const selectedChat: IChat = chats[chatIndex];
        // messages should fetch now
        setSelectedChatIndex(chatIndex);
        setMessages(chatIndex === 0 ? mockData.chat1messages : mockData.chat2messages);
      }
    }, 2000);
  }

  const onSend = () => {
    if (messageRef.current && chats && selectedChatIndex !== undefined) {
      const content: string = messageRef.current.value;
      setIsSendButtonLoading(true);
      //API.sendMessage(props.id, chatId, content)

      return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          const newMessage: IMessage = {
            id: 5,
            chat: chats[selectedChatIndex],
            sender: mockData.user1,
            content,
            status: "sent",
            createdAt: new Date().toISOString()
          }
          const newMessages: IMessage[] = (messages || []).concat(newMessage);
          setMessages(newMessages);
          setIsSendButtonLoading(false);
          resolve();
        }, 2000);
      })
    }
  }

  const onDrawerChange = (state: DrawerOpenChangeDetails) => {
    if (!state.open) {
      setMessages(undefined);
      setSelectedChatIndex(undefined);
    }
  }

  return (
    <Container maxWidth={'70%'}>
      <Stack >
        {
          !chats ? <>
            <Skeleton height={100} />
            <Skeleton height={100} />
            <Skeleton height={100} />
          </>
            :
            chats.map((chat, i) => (
              <Card.Root key={i}>
                <Card.Header>
                  <Card.Title>Buyer: {chat.buyer.username}, Seller: {chat.seller.username}</Card.Title>
                </Card.Header>
                <Card.Body>
                  <DrawerRoot onOpenChange={onDrawerChange}>
                    <DrawerBackdrop />
                    <DrawerTrigger asChild>
                      <Button color={"blue.600"} variant={'surface'} onClick={() => onOpenChat(i)}>Open Chat</Button>
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
                            !messages ? <>
                              <Skeleton height={100} />
                              <Skeleton height={100} />
                              <Skeleton height={100} />
                            </>
                              :
                              messages.map((message, i) => (
                                <Card.Root key={i} variant={'subtle'}>
                                  <Card.Body backgroundColor={message.sender.id === 1 ? 'teal.200' : undefined}>
                                    <Card.Title>Author</Card.Title>
                                    <Card.Description>{message.content}</Card.Description>
                                    <Card.Footer>{new Intl.DateTimeFormat().format(new Date())}</Card.Footer>
                                  </Card.Body>
                                </Card.Root>
                              ))
                          }
                        </Stack>
                      </DrawerBody>
                      <DrawerFooter>
                        <Field label="Message" color={'black'}>
                          <Input ref={messageRef} variant={'subtle'} />
                        </Field>
                        <Button variant={'surface'} onClick={onSend} color={'black'} loading={isSendButtonLoading} disabled={!messages}>Send</Button>
                      </DrawerFooter>
                    </DrawerContent>
                  </DrawerRoot>
                </Card.Body>
              </Card.Root>
            ))
        }
      </Stack>
    </Container>
  )
}
