"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    supabase
      .from("visits")
      .select("count")
      .eq("id", 1)
      .single()
      .then(({ data }) => {
        if (data) setCount(data.count);
      });
  }, []);

  async function handleClick() {
    const next = (count ?? 0) + 1;
    const { data } = await supabase
      .from("visits")
      .update({ count: next })
      .eq("id", 1)
      .select("count")
      .single();
    if (data) setCount(data.count);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-white">
      <h1 className="text-5xl font-bold text-gray-900">Hola Felix</h1>
      <button
        onClick={handleClick}
        className="rounded-lg bg-teal-500 px-8 py-3 text-lg font-medium text-white hover:bg-teal-600 active:bg-teal-700"
      >
        Apretame
      </button>
      <p className="text-gray-500">
        {count === null ? "Cargando..." : `Visitas: ${count}`}
      </p>
    </div>
  );
}
