"use client";
import ListingData from "@/components/listingdata";
import { useState, useEffect } from "react";
export default function Home() {
  const [category, setCategory] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  useEffect(() => {
    // Zwiększamy 'refreshKey' po zmianie kategorii, aby wymusić ponowne renderowanie ListingData
    setRefreshKey((prevKey) => prevKey + 1);
  }, [category]);
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
        seller_id={0}
        category={category}
      />{" "}
    </div>
  );
}
