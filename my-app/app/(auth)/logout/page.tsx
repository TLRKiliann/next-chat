"use client";

import React from 'react'
import { useSession, signOut } from "next-auth/react";
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from "next/image";

export default function LogoutPage() {

  const { data: session } = useSession();

  if (session) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="w-44 h-44 relative mb-4">
          <Image
              src={session.user?.image as string}
              fill
              alt="img profile session"
              className="object-cover rounded-full"
          />
        </div>
        <p className="text-2xl mb-2">Welcome 
        <span className="font-bold">
          {session.user?.name}
        </span>. Signed In As</p>
        <p className="font-bold mb-4">
          {session.user?.email}
        </p>
        <button className="text-slate-50 bg-red-600/90 transition trasform duration-200 
          hover:scale-105 py-2 px-4 rounded-md hover:shadow-btn" 
          onClick={() => signOut()}>
          Sign out
        </button>
        <li className="text-lg font-bold text-blue-500 hover:text-blue-600 active:text-blue-400 mt-4">
          <Link href="/products">
            Go to products
          </Link>
        </li>

        <li className="text-lg font-bold text-blue-500 hover:text-blue-600 active:text-blue-400">
          <Link href="/about">
            Go to about
          </Link>
        </li>

      </div>
    )
  } else {
      redirect("/");
  }
}