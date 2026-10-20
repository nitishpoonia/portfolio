import { getSetting } from "@/lib/admin";
import { CONTACT } from "@/lib/contact";
import SettingsForm from "@/components/studio/SettingsForm";

export default async function SettingsPage() {
  const contact = { ...CONTACT, ...(await getSetting("contact", {})) };
  return <SettingsForm initial={contact} />;
}
