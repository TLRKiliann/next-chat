"use client";

import React from 'react'
import { signIn, useSession } from "next-auth/react";
import { redirect } from 'next/navigation';

export default function Login() {
  
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center bg-slate-50">
        <p className="text-2xl text-gray-600 mb-2">
          Not Signed In
        </p>
        <button className="text-slate-50 border bg-blue-600 transition trasform duration-200 
          hover:scale-105 hover:bg-blue-500 active:scale-95 py-2 px-4 rounded-md hover:shadow mb-2" 
          onClick={() => signIn('google')}
        >
          Sign in with google
        </button>
        <button className="text-gray-600 border border-gray-400 transition trasform duration-200 
          hover:scale-105 active:scale-95 py-2 px-4 rounded-md hover:shadow"
          onClick={() => signIn('github')}
        >
          Sign in with github
        </button>
      </div>
    )
  } else {
    redirect("/chatroom")
  }
}

