"use client";

import { useUser } from "@/components/getUserData";
import { Button } from "@/components/ui/button";
import { DataListItem, DataListRoot } from "@/components/ui/data-list";
import { EmptyState } from "@/components/ui/empty-state";
import { Field } from "@/components/ui/field";
import { IChatResponse } from "@/models/IChat";
import { IMessageResponse } from "@/models/IMessage";
import API from "@/services/API";
import { Card, Container, DrawerBody, DrawerCloseTrigger, DrawerContent, DrawerFooter, DrawerHeader, DrawerOpenChangeDetails, DrawerRoot, DrawerTitle, DrawerTrigger, Input, Skeleton, Stack, Tabs } from "@chakra-ui/react";
import React from "react";
import { LuAnnoyed } from "react-icons/lu";

export default function Page() {
  const { user, accessToken } = useUser();

  const [chats, setChats] = React.useState<IChatResponse[]>();
  const [selectedChatIndex, setSelectedChatIndex] = React.useState<number>();
  const [messages, setMessages] = React.useState<IMessageResponse[]>();
  const [isSendButtonLoading, setIsSendButtonLoading] = React.useState<boolean>(false);

  const buyChats: IChatResponse[] = chats?.filter(chat => chat.buyer === user?.id) || [];
  const sellChats: IChatResponse[] = chats?.filter(chat => chat.seller === user?.id) || [];

  const messageRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (accessToken) {
      API.getChats(accessToken)
        .then(({ results: chats }) => {
          setChats(chats);
        })
    }
  }, []);

  const onOpenChat = (chatIndex: number) => {
    if (chats && accessToken) {
      const selectedChat: IChatResponse = chats[chatIndex];
      setSelectedChatIndex(chatIndex);

      API.getMessages(accessToken, selectedChat.id)
        .then(messages => setMessages(messages));
    }
  }

  const onSend = () => {
    if (messageRef.current && user && accessToken) {
      const content: string = messageRef.current.value;

      if (selectedChatIndex !== undefined && chats) {
        const selectedChat: IChatResponse = chats[selectedChatIndex];
        return API.sendMessageToChat(accessToken, selectedChat.listing, selectedChat.id, content, user.id)
          .then(message => {
            const newMessages: IMessageResponse[] = (messages || []).concat(message);
            setMessages(newMessages);
          });
      }
    }
  }

  const onDrawerChange = (state: DrawerOpenChangeDetails) => {
    if (!state.open) {
      setMessages(undefined);
      setSelectedChatIndex(undefined);
    }
  }

  return (
    <Container maxWidth={'80%'}>
      <Tabs.Root defaultValue="buying" variant={'line'}>
        <Tabs.List>
          <Tabs.Trigger value="buying">
            You're buying
          </Tabs.Trigger>
          <Tabs.Trigger value="selling">
            You're selling
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="buying">
          {
            !buyChats ?
              <Skeleton height={100} />
              :
              buyChats.length === 0 ?
                <EmptyState
                  icon={<LuAnnoyed />}
                  title="No chats"
                  description="You are not buying anything at the moment..."
                />
                :
                buyChats.map(({ seller }, i) => (
                  <Card.Root variant={'elevated'}>
                    <Card.Body>
                      <Card.Title>You are buying from user {seller}</Card.Title>
                    </Card.Body>
                    <Card.Footer>
                    <DrawerRoot onOpenChange={onDrawerChange}>
                    <DrawerTrigger asChild>
                      <Button color={"blue.600"} variant={'surface'} onClick={() => onOpenChat(i)}>Contact</Button>
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
                            messages?.length === 0 ?
                              <EmptyState
                                icon={<LuAnnoyed />}
                                title="No messages"
                                description="Begin a great conversation now!"
                              />
                              :
                              messages?.map(message => (
                                <Card.Root variant={'subtle'}>
                                  <Card.Body backgroundColor={message.sender === user?.id ? 'teal.200' : undefined}>
                                    <Card.Title>{message.sender === user?.id ? 'You' : 'Seller'}</Card.Title>
                                    <Card.Description>{message.content}</Card.Description>
                                    <Card.Footer>{new Intl.DateTimeFormat().format(new Date())}</Card.Footer>
                                  </Card.Body>
                                </Card.Root>
                              ))}
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
                ))
          }
        </Tabs.Content>
        <Tabs.Content value="selling">
          {
            !sellChats ?
              <Skeleton height={100} />
              :
              sellChats.length === 0 ?
                <EmptyState
                  icon={<LuAnnoyed />}
                  title="No transactions"
                  description="You are not selling anything at the moment..."
                />
                :
                sellChats.map(({ buyer }, i) => (
                  <Card.Root variant={'elevated'}>
                    <Card.Body>
                      <Card.Title>You are sellint to user {buyer}</Card.Title>
                    </Card.Body>
                    <Card.Footer>
                    <DrawerRoot onOpenChange={onDrawerChange}>
                    <DrawerTrigger asChild>
                      <Button color={"blue.600"} variant={'surface'} onClick={() => onOpenChat(i)}>Contact</Button>
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
                            messages?.length === 0 ?
                              <EmptyState
                                icon={<LuAnnoyed />}
                                title="No messages"
                                description="Begin a great conversation now!"
                              />
                              :
                              messages?.map(message => (
                                <Card.Root variant={'subtle'}>
                                  <Card.Body backgroundColor={message.sender === user?.id ? 'teal.200' : undefined}>
                                    <Card.Title>{message.sender === user?.id ? 'You' : 'Seller'}</Card.Title>
                                    <Card.Description>{message.content}</Card.Description>
                                    <Card.Footer>{new Intl.DateTimeFormat().format(new Date())}</Card.Footer>
                                  </Card.Body>
                                </Card.Root>
                              ))}
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
                ))
          }
        </Tabs.Content>
      </Tabs.Root>
    </Container>
  );
}
