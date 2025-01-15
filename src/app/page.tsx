"use client";
import ListingData from "@/components/listingdata";
import React from "react";
export default function Home() {
  const [category, setCategory] = React.useState(0);
  const [refreshKey, setRefreshKey] = React.useState(0);

  return (
    <div>
      {" "}
      <div>This is the main page </div>
      <button className="bg-cyan-900 text-white" onClick={() => setCategory(2)}>
        {" "}
        Category change test
      </button>
      <ListingData
        key={refreshKey}
        page={1}
        sellerId={0}
        category={category}
      />
    </div>
  );
}
