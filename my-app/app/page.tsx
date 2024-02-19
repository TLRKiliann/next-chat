//import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <main className="w-full min-h-screen">

      <div className='flex items-center justify-content border'>

        <Link href="/chatroom" className='link-btn'>Chat room</Link>

        <Link href="/chatroom" className='link-btn'>Chat room 2</Link>

      </div>

    </main>
  );
}
