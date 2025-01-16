"use client";
import Link from "next/link";
import LoginPage from "./loginPage";
import { useUser } from "./getUserData";
import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import Form from "./form";
import { Field } from "./ui/field";
import { Input, SelectContent, SelectItem, SelectLabel, SelectTrigger } from "@chakra-ui/react";
import { SelectRoot } from "./ui/select";
import IUser, { INewUserRequest } from "@/models/IUser";
import API from "@/services/API";
export function Navbar() {
  const { user, accessToken, setAccessToken, setUser } = useUser();
  const [isLogged, setIsLogged] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsLogged(accessToken !== null);
  }, [user, accessToken]);

  const onCreateAccount = () => {
    if (usernameRef.current && emailRef.current && passwordRef.current) {
      const username: string = usernameRef.current.value,
        email: string = emailRef.current.value,
        password: string = passwordRef.current.value;

      const newUserRequest: INewUserRequest = {
        username,
        email,
        password
      };

      API.createUser(newUserRequest)
        .then(res => {
          const newUser: IUser = {
            id: res.id,
            username,
            email
          };
          setUser(newUser);
        });
    }
  }

  return (
    <div className="flex bg-cyan-600 leading-9 ">
      <div className="text-white gap-3 flex px-5">
        <Link href={"/"} className="hover:cursor-pointer hover:bg-cyan-400">
          Home
        </Link>
        <Link
          href={"/myListings "}
          className="hover:cursor-pointer hover:bg-cyan-400"
        >
          Listings
        </Link>
        <Link
          href={"/myOrders"}
          className="hover:cursor-pointer hover:bg-cyan-400 rounded-md"
        >
          {" "}
          Orders
        </Link>
        <Link href={"/chat"} className="hover:cursor-pointer hover:bg-cyan-400">
          Messages
        </Link>
        <Link
          href={"/myAccount"}
          className="hover:cursor-pointer hover:bg-cyan-400 rounded-md"
        >
          My account
        </Link>
      </div>
      {isLogged ? (
        <>
          <div className="text-white absolute top-1 right-48 text-xl">
            {" "}
            Hello user {user?.username}
          </div>
          <button onClick={() => setAccessToken(null)}>Logout</button>{" "}
        </>
      ) : (
        <LoginPage />
      )}
      <Button onClick={() => setShowForm(true)}>Register</Button>
      <Form open={showForm} onConfirm={onCreateAccount}>
        <Field label="Username">
          <Input variant={'subtle'} ref={usernameRef} />
        </Field>
        <Field label="Email">
          <Input variant={'subtle'} ref={emailRef} />
        </Field>
        <Field label="Password">
          <Input variant={'subtle'} ref={passwordRef} />
        </Field>
      </Form>
    </div>
  );
}
