"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { glass, input, btn, btnGhost, label } from "./ui";

export default function SecurityForm() {
  const router = useRouter();
  const [v, setV] = useState({ current: "", next: "", confirm: "" });
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function change(e) {
    e.preventDefault();
    if (v.next !== v.confirm) return setMsg("New passwords don't match");
    setBusy(true);
    setMsg("Saving…");
    const res = await fetch("/api/studio/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ current: v.current, next: v.next }),
    });
    setBusy(false);
    if (res.ok) {
      setV({ current: "", next: "", confirm: "" });
      setMsg("Password changed. Other devices were logged out.");
    } else {
      setMsg((await res.json()).error || "Failed");
    }
  }

  async function logoutEverywhere() {
    await fetch("/api/studio/logout?all=1", { method: "POST" });
    router.replace("/studio/login");
    router.refresh();
  }

  const f = (k, l, ac) => (
    <div>
      <label htmlFor={`pw-${k}`} className={label}>{l}</label>
      <input id={`pw-${k}`} type="password" autoComplete={ac} className={input} value={v[k]} onChange={(e) => setV({ ...v, [k]: e.target.value })} />
    </div>
  );

  return (
    <form onSubmit={change} className={`${glass} flex flex-col gap-4 p-6`}>
      <div>
        <h2 className="text-lg font-semibold">Password</h2>
        <p className="mt-1 text-sm text-[#55555A]">Changing it logs you out on every other device.</p>
      </div>
      {f("current", "Current password", "current-password")}
      {f("next", "New password (10+ characters)", "new-password")}
      {f("confirm", "Confirm new password", "new-password")}
      <div className="flex flex-wrap items-center gap-3">
        <button className={btn} disabled={busy || !v.current || !v.next}>Change password</button>
        <button type="button" className={btnGhost} onClick={logoutEverywhere}>Log out everywhere</button>
        <span role="status" className="text-sm text-[#55555A]">{msg}</span>
      </div>
    </form>
  );
}
