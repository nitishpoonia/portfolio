"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { glass, input, btn } from "@/components/studio/ui";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/studio/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.replace("/studio");
      router.refresh();
    } else {
      setError((await res.json()).error || "Login failed");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className={`${glass} mx-auto mt-24 flex max-w-sm flex-col gap-4 p-8`}>
      <h1 className="text-2xl font-semibold tracking-tight">Studio</h1>
      <label htmlFor="pw" className="sr-only">Password</label>
      <input id="pw" type="password" autoFocus autoComplete="current-password" placeholder="Password" className={input} value={password} onChange={(e) => setPassword(e.target.value)} />
      {error && <p role="alert" className="px-1 text-sm text-red-700">{error}</p>}
      <button className={btn} disabled={busy || !password}>{busy ? "Checking…" : "Log in"}</button>
    </form>
  );
}
