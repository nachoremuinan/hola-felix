export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-white">
      <h1 className="text-5xl font-bold text-gray-900">Hola Felix</h1>
      <button className="rounded-lg bg-teal-500 px-8 py-3 text-lg font-medium text-white hover:bg-teal-600 active:bg-teal-700">
        Apretame
      </button>
    </div>
  );
}
