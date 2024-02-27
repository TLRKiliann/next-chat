import FormSelectRoom from "@/app/components/FormSelectRoom";
import Link from 'next/link';

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-slate-900">

      <div className='flex items-center justify-content'>

        <h1 className='text-4xl font-bold p-8'>Welcome to Chatr0↔️0m !</h1>
        <Link href="/chatroom">Chatroom</Link>
      </div>

      <hr />

      <FormSelectRoom />

    </main>
  );
}
