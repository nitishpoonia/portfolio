"use client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { btnGhost } from "./ui";

export default function LogoutButton() {
  const router = useRouter();
  return (
    <button
      className={`${btnGhost} gap-1.5 !px-3 sm:!px-5`}
      aria-label="Log out"
      onClick={async () => {
        await fetch("/api/studio/logout", { method: "POST" });
        router.replace("/studio/login");
        router.refresh();
      }}
    >
      <LogOut size={16} aria-hidden="true" />
      <span className="hidden sm:inline">Log out</span>
    </button>
  );
}
