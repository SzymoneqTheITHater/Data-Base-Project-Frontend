"use client";
import React, { useState, useEffect } from "react";
interface Meta {
  title: string;
  description: string;
  price: number;
  createdAt: string;
  category: number;
  id: number;
  state: string;
  imageUrl: string | null;
  seller: number;
}
interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Meta[];
}
const link: string = "http://127.0.0.1:8000/";
const ListingData: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(link);

        if (!response.ok) {
          throw new Error(`There was an error: ${response.statusText}`);
        }

        const result: ApiResponse = await response.json();
        //console.log(result);

        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error has occured; {error}</div>;
  }
  if (!data || !data.results || data.results.length === 0) {
    return <div>No listings found.</div>;
  }
  return (
    <div className="flex flex-col gap-5  ">
      {data.results.map((item) => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <p>Price: {item.price} PLN</p>
          <p>Category ID: {item.category}</p>
          <p>Seller ID: {item.seller}</p>
          <p>State: {item.state}</p>
        </div>
      ))}
    </div>
  );
};
export default ListingData;
