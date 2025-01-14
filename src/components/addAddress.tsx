"use client";

import { useState, FormEvent } from "react";
import { useUser } from "./getUserData";
export default function AddAddres() {
  const { accessToken } = useUser();
  const [formData, setFormData] = useState({
    country: "",
    town: "",
    street: "",
    postal_code: 0,
    building_number: 0,
  });
  const [status, setStatus] = useState<string>("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/postAddress/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      console.log("address added");
      //const data = await response.json()
      setStatus("Your address has been added succesfully!");
    } else {
      console.log("deal gone wrong");
      setStatus("Something went wrong, check if the data is correct");
    }
  }
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  return (
    <div className="flex justify-end pr-2  ">
      <form onSubmit={handleSubmit} className="space-y-4  ">
        <div>
          <label
            htmlFor="country"
            className=" flex  text-sm font-medium text-gray-700"
          >
            Country
          </label>
          <input
            type="text"
            name="country"
            id="country"
            value={formData.country}
            onChange={handleChange}
            required
            className="mt-1  flex    px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="town"
            className=" flex  text-sm font-medium text-gray-700"
          >
            City
          </label>
          <input
            type="text"
            name="town"
            id="town"
            value={formData.town}
            onChange={handleChange}
            required
            className="mt-1  flex    px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="street"
            className=" flex  text-sm font-medium text-gray-700"
          >
            Street
          </label>
          <input
            type="text"
            name="street"
            id="street"
            value={formData.street}
            onChange={handleChange}
            required
            className="mt-1  flex    px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="postal_code"
            className=" flex  text-sm font-medium text-gray-700"
          >
            Postal code
          </label>
          <input
            type="number"
            name="postal_code"
            id="postal_code"
            value={formData.postal_code}
            onChange={handleChange}
            required
            className="mt-1  flex    px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="building_number"
            className=" flex  text-sm font-medium text-gray-700"
          >
            Building number
          </label>
          <input
            type="number"
            name="building_number"
            id="building_number"
            value={formData.building_number}
            onChange={handleChange}
            required
            className="mt-1  flex    px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="  bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Send address
        </button>

        <p className="mt-4 text-center text-gray-500">{status}</p>
      </form>
    </div>
  );
}
