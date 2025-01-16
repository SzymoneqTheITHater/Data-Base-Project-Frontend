"use client";
import ListingData from "@/components/listingdata";
import { useUser } from "@/components/getUserData";
import { Button, Container, createListCollection, Fieldset, Flex, Heading, Input, NumberInput, SelectItem } from "@chakra-ui/react";
import React from "react";
import { Field } from "@/components/ui/field";
import { SelectContent, SelectLabel, SelectRoot, SelectTrigger } from "@/components/ui/select";
import { TState } from "@/models/TState";
import { cookies } from "next/headers";
import IListing, { IListingRequest } from "@/models/IListing";
import API from "@/services/API";

export default function Page() {
  const { accessToken, user } = useUser();
  const [isListingForm, setListingForm] = React.useState(false);
  const [listings, setListings] = React.useState<IListing[] | undefined>();
  const titleRef = React.useRef<HTMLInputElement>(null);
  const descriptionRef = React.useRef<HTMLInputElement>(null);
  const priceRef = React.useRef<HTMLInputElement>(null);
  const locationRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {

  }, []);

  const hAddButton = () => {
    if (user && titleRef.current && descriptionRef.current && priceRef.current && locationRef.current && accessToken) {
      const title: string = titleRef.current.value,
        description: string = descriptionRef.current.value,
        price: number = +priceRef.current.value,
        location: string = locationRef.current.value;

      const body: IListingRequest = {
        title,
        description,
        price,
        location,
        seller: user.id
      };

      API.addListing(accessToken, body)
        .then(res => res.json())
        .then(({ id, state, createdAt }) => {
          const newListing: IListing = {
            id,
            title,
            description,
            price,
            location,
            seller: user,
            isActive: true,
            category: null,
            createdAt,
            state
          };

          const newListings: IListing[] = (listings || []).concat(newListing);
          setListings(newListings);
        });
    }
  }

  const stateOptions: TState[] = ['active', 'bought', 'pending', 'cancelled'];
  return (
    <div>
      <Heading>My listings</Heading>
      <Flex direction={'row'}>
        <Button color={"blue.600"} variant={'surface'} onClick={() => setListingForm(value => !value)}>Add</Button>
      </Flex>
      {isListingForm && (
        <Container maxWidth={'80%'}>
          <Fieldset.Root>
            <Fieldset.Content>
              <Field label="Title">
                <Input ref={titleRef} variant={'subtle'} color={'black'}/>
              </Field>
              <Field label="Description">
                <Input ref={descriptionRef} variant={'subtle'} color={'black'}/>
              </Field>
              <Field label="Location">
                <Input ref={locationRef} variant={'subtle'} color={'black'}/>
              </Field>
              <NumberInput.Root variant={'subtle'}>
                <NumberInput.Label>Price</NumberInput.Label>
                <NumberInput.Input ref={priceRef} color={'black'}></NumberInput.Input>
              </NumberInput.Root>
              <SelectRoot collection={createListCollection({ items: stateOptions })} variant={'subtle'}>
                <SelectLabel>State</SelectLabel>
                <SelectTrigger></SelectTrigger>
                <SelectContent>
                  {stateOptions.map((option, i) => (
                    <SelectItem item={option} key={i}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </Fieldset.Content>
          </Fieldset.Root>
          <Button color={"blue.600"} variant={'surface'} onClick={hAddButton}>Submit</Button>
        </Container>
      )}
      <div>
        <ListingData page={1} sellerId={user?.id || 0} category={0} listings={listings} onBuy={() => undefined}/>
      </div>
    </div>
  )
}
