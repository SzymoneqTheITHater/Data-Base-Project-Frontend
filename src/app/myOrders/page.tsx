"use client";

import Form from "@/components/form";
import { useUser } from "@/components/getUserData";
import { DataListItem, DataListRoot } from "@/components/ui/data-list";
import { EmptyState } from "@/components/ui/empty-state";
import { Field } from "@/components/ui/field";
import { Rating } from "@/components/ui/rating";
import { IReviewRequest } from "@/models/IReview";
import { ITransactionResponse } from "@/models/ITransaction";
import { TStatus } from "@/models/TStatus";
import API from "@/services/API";
import { Badge, Button, Card, Container, Fieldset, HStack, Input, Skeleton, Tabs } from "@chakra-ui/react";
import { title } from "process";
import React from "react";
import { LuAnnoyed } from "react-icons/lu";

export default function Page() {
  const { accessToken, user } = useUser();

  const [buyingTransactions, setBuyingTransactions] = React.useState<ITransactionResponse[]>();
  const [sellingTransactions, setSellingTransactions] = React.useState<ITransactionResponse[]>();
  const [reviewedTransactionId, setReviewedTransactionId] = React.useState<number>();
  const [rating, setRating] = React.useState<number>(4);

  const commentRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (accessToken && user) {
      API.getTransactions(accessToken)
        .then(res => {
          const transactions: ITransactionResponse[] = res.results,
            buyingTransactions: ITransactionResponse[] = transactions.filter(transaction => transaction.buyer === user.id),
            sellingTransactions: ITransactionResponse[] = transactions.filter(transaction => transaction.seller === user.id);

          setBuyingTransactions(buyingTransactions);
          setSellingTransactions(sellingTransactions);
        })
    }
  }, []);

  const onDecision = (transactionId: number, decision: TStatus) => {
    if (accessToken && user && sellingTransactions) {
      API.updateTransaction(accessToken, transactionId, { status: decision, user: user.id })
        .then(res => {
          const newSellingTransactions: ITransactionResponse[] = [...sellingTransactions];
          const updatedTransaction: ITransactionResponse | undefined = newSellingTransactions.find(transaction => transaction.id === transactionId);
          if (updatedTransaction) {
            updatedTransaction.status = decision;
            setSellingTransactions(newSellingTransactions);
          }
        })
    }
  };

  const onSendReview = () => {
    if (accessToken && user && commentRef.current) {
      const reviewedTransaction: ITransactionResponse | undefined = buyingTransactions?.find(transaction => transaction.id === reviewedTransactionId);
      if (reviewedTransaction) {
        const reviewRequest: IReviewRequest = {
          listing: reviewedTransaction.listing,
          reviewee: reviewedTransaction.seller,
          reviewer: user.id,
          comment: commentRef.current.value || "Oh, it was great experience!",
          rating: rating.toString()
        }
        API.createReview(accessToken, reviewRequest)
          .then(() => {

          })
      }
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
            !buyingTransactions ?
              <Skeleton height={100} />
              :
              buyingTransactions.length === 0 ?
                <EmptyState
                  icon={<LuAnnoyed />}
                  title="No transactions"
                  description="You are not buying anything at the moment..."
                />
                :
                buyingTransactions.map(({ buyer, seller, status, transaction_date, id }) => (
                  <Card.Root variant={'elevated'}>
                    <Card.Body>
                      <Card.Title>{title}</Card.Title>
                      <DataListRoot>
                        <DataListItem key='buyer' label='Buyer' value={buyer} />
                        <DataListItem key='seller' label='Seller' value={seller} />
                        <DataListItem key='date' label='Date' value={new Date(transaction_date).toLocaleDateString()} />
                      </DataListRoot>
                      <Badge colorPalette={status === 'pending' ? 'orange' : status === 'completed' ? 'green' : 'red'} maxWidth={'80px'}>{status}</Badge>
                      {status === 'completed' &&
                        <div>
                          <Button onClick={() => setReviewedTransactionId(id)}>Write review</Button>
                          {reviewedTransactionId !== undefined &&
                            <Fieldset.Root>
                              <Fieldset.Content>
                                <Field label="Comment">
                                  <Input variant={'subtle'} ref={commentRef} />
                                </Field>
                                <Field label="Rating">
                                  <Rating value={rating} onValueChange={value => setRating(value.value)} />
                                </Field>
                              </Fieldset.Content>
                              <Button onClick={onSendReview}>Submit</Button>
                            </Fieldset.Root>
                          }
                        </div>
                      }
                    </Card.Body>
                  </Card.Root>
                ))
          }
        </Tabs.Content>
        <Tabs.Content value="selling">
          {
            !sellingTransactions ?
              <Skeleton height={100} />
              :
              sellingTransactions.length === 0 ?
                <EmptyState
                  icon={<LuAnnoyed />}
                  title="No transactions"
                  description="You are not selling anything at the moment..."
                />
                :
                sellingTransactions.map(({ buyer, seller, status, transaction_date, id }) => (
                  <Card.Root variant={'elevated'}>
                    <Card.Body>
                      <Card.Title>{title}</Card.Title>
                      <DataListRoot>
                        <DataListItem key='buyer' label='Buyer' value={buyer} />
                        <DataListItem key='seller' label='Seller' value={seller} />
                        <DataListItem key='date' label='Date' value={new Date(transaction_date).toLocaleDateString()} />
                      </DataListRoot>
                      <Badge colorPalette={status === 'pending' ? 'orange' : status === 'completed' ? 'green' : 'red'}>{status}</Badge>
                    </Card.Body>
                    <Card.Footer>
                      <HStack>
                        <Button color={"blue.600"} variant={'surface'} onClick={() => onDecision(id, 'completed')}>Accept</Button>
                        <Button color={"blue.600"} variant={'surface'} onClick={() => onDecision(id, 'canceled')}>Refuse</Button>
                      </HStack>
                    </Card.Footer>
                  </Card.Root>
                ))
          }
        </Tabs.Content>
      </Tabs.Root>
    </Container>
  );
}
