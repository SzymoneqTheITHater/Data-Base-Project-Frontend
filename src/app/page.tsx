"use client";
import Form from "@/components/form";
import { useUser } from "@/components/getUserData";
import ListingData from "@/components/listingdata";
import { Field } from "@/components/ui/field";
import mockData from "@/mockData";
import IListing from "@/models/IListing";
import { ITransactionRequest } from "@/models/ITransaction";
import API from "@/services/API";
import { SelectRoot, SelectLabel, SelectTrigger, SelectContent, SelectItem, Input, createListCollection } from "@chakra-ui/react";
import React from "react";
export default function Home() {
  const { accessToken } = useUser();


  const [category, setCategory] = React.useState(0);
  const [refreshKey, setRefreshKey] = React.useState(0);
  const [listings, setListings] = React.useState<IListing[]>();
  const [selectedListingId, setSelectedListingId] = React.useState<number>();

  const shippingNames: string[] = ['DHL', 'Inpost', 'Polish Post', 'Self service'];
  const paymentNames: string[] = ['BLIK', 'Cash', 'Check', 'Online transfer'];
  const shippingOptions = createListCollection({ items: shippingNames });
  const paymentOptions = createListCollection({ items: paymentNames });


  React.useEffect(() => {
    API.getListings()
      .then(listings => setListings(listings.results));
  }, []);

  const onConfirmForm = () => {
    if (accessToken && selectedListingId !== undefined) {
      const transactionRequest: ITransactionRequest = {
        listing: selectedListingId
      }
      API.createTransaction(accessToken, transactionRequest)
        .then(res => {
          setSelectedListingId(undefined);

        })
    }
  }

  return (
    <div>
      <div>This is the main page </div>
      <button className="bg-cyan-900 text-white" onClick={() => setCategory(2)}>
        All listings
      </button>
      <Form open={selectedListingId !== undefined} onConfirm={onConfirmForm} onClose={() => setSelectedListingId(undefined)}>
        <Field label="Your name">
          <Input variant={'subtle'} />
        </Field>
        <Field label="Your adress">
          <Input variant={'subtle'} />
        </Field>
        <SelectRoot collection={shippingOptions} variant={'subtle'}>
          <SelectLabel>Shipping method</SelectLabel>
          <SelectTrigger></SelectTrigger>
          <SelectContent>
            {shippingOptions.items.map((option, i) => (
              <SelectItem item={option} key={i}>{option}</SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
        <SelectRoot collection={paymentOptions} variant={'subtle'}>
          <SelectLabel>Payment method</SelectLabel>
          <SelectTrigger />
          <SelectContent>
            {paymentOptions.items.map((option, i) => (
              <SelectItem item={option} key={i}>{option}</SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </Form>
      <ListingData
        key={refreshKey}
        page={1}
        sellerId={0}
        category={category}
        listings={listings}
        onBuy={listingId => setSelectedListingId(listingId)}
      />
    </div>
  );
}
