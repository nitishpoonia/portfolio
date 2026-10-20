"use client";
import { useRouter } from "next/navigation";
import { btnGhost } from "./ui";

export default function LogoutButton() {
  const router = useRouter();
  return (
    <button
      className={btnGhost}
      onClick={async () => {
        await fetch("/api/studio/logout", { method: "POST" });
        router.replace("/studio/login");
        router.refresh();
      }}
    >
      Log out
    </button>
  );
}
