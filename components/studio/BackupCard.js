import { Download } from "lucide-react";
import { glass, btn, btnGhost } from "./ui";

// Plain links: the browser downloads the file with the session cookie.
export default function BackupCard() {
  return (
    <section className={`${glass} flex flex-col gap-3 p-6`} aria-labelledby="backup-h">
      <h2 id="backup-h" className="text-lg font-semibold">Backup</h2>
      <p className="text-sm text-[#55555A]">
        Download every post, project (drafts included) and setting as one JSON file. Keep a copy somewhere
        other than this database.
      </p>
      <div className="flex flex-wrap gap-2">
        <a className={`${btn} gap-1.5`} href="/api/studio/export" download>
          <Download size={16} aria-hidden="true" />Download content
        </a>
        <a className={`${btnGhost} gap-1.5`} href="/api/studio/export?media=1" download>
          <Download size={16} aria-hidden="true" />With images
        </a>
      </div>
    </section>
  );
}
