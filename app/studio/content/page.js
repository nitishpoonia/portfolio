import { getSettings } from "@/lib/admin";
import { DEFAULTS } from "@/lib/site-content";
import { AvailabilityForm, NowBuildingForm, JsonForm } from "@/components/studio/SiteContentForms";

export default async function SiteContentPage() {
  const saved = await getSettings();
  const value = (key) => saved[key] ?? DEFAULTS[key];
  const custom = (key) => key in saved;
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Site content</h1>
        <p className="mt-1 text-sm text-[#55555A]">Changes go live as soon as you save. No deploy needed.</p>
      </div>
      <AvailabilityForm initial={value("availability")} custom={custom("availability")} />
      <NowBuildingForm initial={value("now_building")} custom={custom("now_building")} />
      <JsonForm settingKey="chapters" title="Story chapters" custom={custom("chapters")} initial={value("chapters")}
        hint='The "How I got here" timeline. Each chapter: big, when, title, text, built (list), links ([{ "label", "href" }]), photo ("/photos/x.jpg" or null), and "current": true on the one in progress.' />
      <JsonForm settingKey="skills" title="Skills" custom={custom("skills")} initial={value("skills")}
        hint='The "What I build with" tabs on the home page. Each group: label and items. Labels with an icon: Mobile, Frontend, Backend, AI & Python, Integrations, Tools.' />
    </div>
  );
}
