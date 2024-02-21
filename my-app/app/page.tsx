import FormSelectRoom from "@/app/components/FormSelectRoom";

export default function Home() {
  return (
    <main className="w-full min-h-screen">

      <div className='flex items-center justify-content'>

        <h1 className='text-4xl font-bold p-8'>Welcome to Chatr00m !</h1>

      </div>

      <hr />

      <FormSelectRoom />

    </main>
  );
}
