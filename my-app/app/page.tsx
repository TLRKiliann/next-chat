import FormSelectRoom from "@/app/components/FormSelectRoom";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-slate-800">

      <div className='flex items-center justify-content border-b border-slate-600'>

        <h1 className='text-4xl font-bold p-8'>Chatr00m App</h1>

      </div>

      <FormSelectRoom />

    </main>
  );
}
