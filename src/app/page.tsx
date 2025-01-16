"use client";
import Form from "@/components/form";
import ListingData from "@/components/listingdata";
import mockData from "@/mockData";
import IListing from "@/models/IListing";
import React from "react";
export default function Home() {
  const [category, setCategory] = React.useState(0);
  const [refreshKey, setRefreshKey] = React.useState(0);
  const [listings, setListings] = React.useState<IListing[]>();
  const [selectedListingId, setSelectedListingId] = React.useState<number>();

  React.useEffect(() => {
    /*     const body = {
    
        };
        fetch(url + "/listings/", {
          headers: {
    
          },
          body: JSON.stringify()
        })
     */
    setTimeout(() => {
      setListings(mockData.listings);
    }, 3000);
  }, []);

  const onFormConfirm = () => {
    setSelectedListingId(undefined);
    // TODO add transaction
  }

  return (
    <div>
      <div>This is the main page </div>
      <button className="bg-cyan-900 text-white" onClick={() => setCategory(2)}>
        All listings
      </button>
      <Form open={selectedListingId !== undefined} onConfirm={onFormConfirm} />
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
