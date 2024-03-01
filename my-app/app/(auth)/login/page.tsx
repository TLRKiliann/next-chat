"use client";

import React from 'react'
import { signIn, useSession } from "next-auth/react";
import { redirect } from 'next/navigation';

export default function Login() {
  
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center bg-slate-800">
        <p className="text-2xl text-slate-500 mb-2">
          Not Signed In
        </p>
        <button className="text-slate-50 bg-blue-600 transition trasform duration-200 
          hover:scale-105 hover:bg-blue-700 active:scale-95 active:bg-blue-500 py-2 px-4 rounded-md hover:shadow mb-2" 
          onClick={() => signIn('google')}
        >
          Sign in with google
        </button>
        <button className="text-slate-400 border border-slate-500 transition trasform duration-200 
          hover:scale-105 active:scale-95 py-2 px-4 rounded-md hover:shadow"
          onClick={() => signIn('github')}
        >
          Sign in with github
        </button>
      </div>
    )
  } else {
    redirect("/")
  }
}

