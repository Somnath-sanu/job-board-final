"use client";

import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";

export default function SearchField() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const q = searchParams.get("q") || "";
    setQuery(q);
  }, [searchParams]);

  function handleSubmit(e: React.FocusEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const q = (form.q as HTMLInputElement).value.trim();
    if (!q) return;

    router.push(`/?q=${encodeURIComponent(q)}`);
  }

  return (
    <form onSubmit={handleSubmit} method="GET" action="/?q">
      <div className="relative">
        <Input
          name="q"
          placeholder="Search"
          className="pe-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <SearchIcon className="absolute right-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
      </div>
    </form>
  );
}
