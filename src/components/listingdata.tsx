"use client";
import Image from "next/image";

import React, { useState, useEffect } from "react";
import Listing from "./listing";
import IListing from "@/models/IListing";
import { Container, Skeleton } from "@chakra-ui/react";
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
interface Meta {
  title: string;
  description: string;
  price: number;
  createdAt: string;
  category: number;
  id: number;
  state: string;
  image: string | null;
  seller: number;
}
interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Meta[];
}

interface IProps {
  page: number,
  sellerId: number,
  category: number,
  listings?: IListing[],
  onBuy(listingId: number): any,
}

export default function ListingData(props: IProps) {
  return (
    <Container maxWidth={'80%'}>
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
    </Container>
  );
};