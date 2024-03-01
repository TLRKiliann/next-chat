"use client";
import { useSession } from "next-auth/react";
import FormSelectRoom from "@/app/components/FormSelectRoom";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  if (!session) {
    redirect("/login")
  }
  return (
    <main className="w-full min-h-screen bg-slate-800">

      <div className='flex items-center justify-content border-b border-slate-600'>

        <h1 className='text-4xl font-bold p-8'>Chatr00m App</h1>

      </div>

      <FormSelectRoom />

    </main>
  );
}
