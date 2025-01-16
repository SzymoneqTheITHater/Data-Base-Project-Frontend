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

const link: string = "http://127.0.0.1:8000";
export default function ListingData(props: IProps) {
  const [error, setError] = useState<string | null>(null);

  /*
  if (error) {
    return <div>Error has occured; {error}</div>;
  }
  if (!data || !data.results || data.results.length === 0) {
    return <div>No listings found.</div>;
  }
    */
  return (
    <Container maxWidth={'80%'}>
      {
        !props.listings ? 
        <Skeleton height={200}/>
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