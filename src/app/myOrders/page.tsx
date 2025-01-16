"use client";

import { useUser } from "@/components/getUserData";
import { DataListItem, DataListRoot } from "@/components/ui/data-list";
import { ITransactionResponse } from "@/models/ITransaction";
import { TStatus } from "@/models/TStatus";
import API from "@/services/API";
import { Button, Card, Container, Skeleton } from "@chakra-ui/react";
import { title } from "process";
import React from "react";

export default function Page() {
  const { accessToken, user } = useUser();

  const [transactions, setTransactions] = React.useState<ITransactionResponse[]>();

  React.useEffect(() => {
    if (accessToken) {
      API.getTransactions(accessToken)
        .then(res => {
          setTransactions(res.results);
        })
    }
  }, []);

  const onDecision = (transactionId: number, decision: TStatus) => {
    if (accessToken && user && transactions) {
      API.updateTransaction(accessToken, transactionId, { status: decision, user: user.id })
        .then(res => {
          const newTransactions: ITransactionResponse[] = [...transactions];
          const updatedTransaction: ITransactionResponse | undefined = newTransactions.find(transaction => transaction.id === transactionId);
          if (updatedTransaction) {
            updatedTransaction.status = decision;
            setTransactions(newTransactions);
          }
        })
    }
  };

  return (
    <Container maxWidth={'80%'}>
      {
        !transactions ?
          <Skeleton height={200} />
          :
          transactions.map(({ buyer, seller, status, transaction_date, id }) => (
            <Card.Root variant={'elevated'}>
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <DataListRoot>
                  <DataListItem key='buyer' label='Buyer' value={buyer} />
                  <DataListItem key='seller' label='Seller' value={seller} />
                  <DataListItem key='date' label='Date' value={new Date(transaction_date).toLocaleDateString()} />
                  <DataListItem key='status' label='Status' value={status} />
                </DataListRoot>
              </Card.Body>
              <Card.Footer>
                <Button color={"blue.600"} variant={'surface'} onClick={() => onDecision(id, 'completed')}>Accept</Button>
                <Button color={"blue.600"} variant={'surface'} onClick={() => onDecision(id, 'canceled')}>Refuse</Button>
              </Card.Footer>
            </Card.Root>
          ))}
    </Container>

  );
}
