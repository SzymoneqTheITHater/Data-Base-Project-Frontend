"use client";
import ListingData from "@/components/listingdata";
import mockData from "@/mockData";
import IListing from "@/models/IListing";
import React from "react";
export default function Home() {
  const [category, setCategory] = React.useState(0);
  const [refreshKey, setRefreshKey] = React.useState(0);
  const [listings, setListings] = React.useState<IListing[]>();

  const url: string = "http://127.0.0.1:8000";
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

  return (
    <div>
      <div>This is the main page </div>
      <button className="bg-cyan-900 text-white" onClick={() => setCategory(2)}>
        All listings
      </button>
      <ListingData
        key={refreshKey}
        page={1}
        sellerId={0}
        category={category}
        listings={listings}
      />
    </div>
  );
}
