"use client";
import ListingData from "@/components/listingdata";
import { useUser } from "@/components/getUserData";

export default function Page() {
  const { user } = useUser();
  return (
    <div>
      <div>This page hzzas my listings</div>
      <div>
        {" "}
        <ListingData page={1} seller_id={user?.id || 0} category={0} />{" "}
      </div>
    </div>
  );
}
