"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { glass, input, btn } from "@/components/studio/ui";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [show, setShow] = useState(false);

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
    <div className="mx-auto mt-[12vh] flex max-w-sm flex-col gap-4">
    <form onSubmit={submit} className={`${glass} flex flex-col gap-4 p-8`}>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Studio</h1>
        <p className="mt-1 text-sm text-[#55555A]">Write and publish on nitishpoonia.in</p>
      </div>
      <label htmlFor="pw" className="sr-only">Password</label>
      <div className="relative">
        <input id="pw" type={show ? "text" : "password"} autoFocus autoComplete="current-password" placeholder="Password" className={`${input} pr-12`} value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="button" onClick={() => setShow((v) => !v)} aria-label={show ? "Hide password" : "Show password"}
          className="absolute right-1 top-1/2 inline-flex h-[40px] w-[40px] -translate-y-1/2 items-center justify-center rounded-full text-[#55555A] hover:bg-black/5">
          {show ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
        </button>
      </div>
      {error && <p role="alert" className="px-1 text-sm text-red-700">{error}</p>}
      <button className={btn} disabled={busy || !password}>{busy ? "Checking…" : "Log in"}</button>
    </form>
    <Link href="/" className="inline-flex min-h-[44px] items-center gap-1.5 self-center rounded-full px-4 text-sm text-[#55555A] hover:text-[#0A0A0A]">
      <ArrowLeft size={15} aria-hidden="true" />Back to site
    </Link>
    </div>
  );
}
