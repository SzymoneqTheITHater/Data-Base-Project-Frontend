"use client";
import Image from "next/image";

import React, { useState, useEffect } from "react";
import Listing from "./listing";
import IListing, { IListingResponse } from "@/models/IListing";
import { Container, Skeleton, Stack } from "@chakra-ui/react";
interface ImageLoaderProps {
  src: string;
  width: number;
}
interface ListingDataProps {
  page: number | null;
  seller_id: number | null;
  category: number | null;
}

const ImageLoader = ({ src, width }: ImageLoaderProps): string => {
  return `http://127.0.0.1:8000${src}?w=${width}&q=${75}`;
};

interface IProps {
  page: number,
  sellerId: number,
  category: number,
  listings?: IListingResponse[],
  onBuy(listingId: number): any,
}

export default function ListingData(props: IProps) {
  return (
    <Container maxWidth={'80%'}>
      <Stack>
        {
          !props.listings ?
            <Skeleton height={200} />
            :
            props.listings.map(item => (
              <Listing
                {...item}
                onBuy={props.onBuy}
              />
            ))}
      </Stack>
    </Container>
  );
};