import { getSetting } from "@/lib/admin";
import { CONTACT } from "@/lib/contact";
import SettingsForm from "@/components/studio/SettingsForm";
import SecurityForm from "@/components/studio/SecurityForm";
import BackupCard from "@/components/studio/BackupCard";

export default async function SettingsPage() {
  const contact = { ...CONTACT, ...(await getSetting("contact", {})) };
  return (
    <div className="flex flex-col gap-6">
      <SettingsForm initial={contact} />
      <SecurityForm />
      <BackupCard />
    </div>
  );
}
