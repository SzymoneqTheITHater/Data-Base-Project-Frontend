"use client";

import { useUser } from "@/components/getUserData";
import { DataListItem, DataListRoot } from "@/components/ui/data-list";
import { EmptyState } from "@/components/ui/empty-state";
import { ITransactionResponse } from "@/models/ITransaction";
import { TStatus } from "@/models/TStatus";
import API from "@/services/API";
import { Badge, Button, Card, Container, HStack, Skeleton, Tabs } from "@chakra-ui/react";
import { title } from "process";
import React from "react";
import { LuUser, LuFolder, LuSquareCheck, LuAnnoyed } from "react-icons/lu";

export default function Page() {
  const { accessToken, user } = useUser();

  const [buyingTransactions, setBuyingTransactions] = React.useState<ITransactionResponse[]>();
  const [sellingTransactions, setSellingTransactions] = React.useState<ITransactionResponse[]>();

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
                buyingTransactions.map(({ buyer, seller, status, transaction_date }) => (
                  <Card.Root variant={'elevated'}>
                    <Card.Body>
                      <Card.Title>{title}</Card.Title>
                      <DataListRoot>
                        <DataListItem key='buyer' label='Buyer' value={buyer} />
                        <DataListItem key='seller' label='Seller' value={seller} />
                        <DataListItem key='date' label='Date' value={new Date(transaction_date).toLocaleDateString()} />
                      </DataListRoot>
                      <Badge colorPalette={status === 'pending' ? 'orange' : status === 'completed' ? 'green' : 'red'} maxWidth={'40px'}>{status}</Badge>
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
