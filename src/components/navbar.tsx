import Link from "next/link";
export function Navbar() {
  return (
    <div className="text-cyan-700 gap-3 flex ">
      <Link href={"/"}>Home</Link>
      <Link href={"/myListings"}>Listings</Link>
      <Link href={"/myOrders"}> Orders</Link>
      <Link href={"/chat"}>Messages</Link>
      <Link href={"/myAccount"}>My account</Link>
    </div>
  );
}
