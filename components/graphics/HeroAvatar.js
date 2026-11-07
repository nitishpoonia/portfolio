import Image from "next/image";
import { Smartphone, Globe, Sparkles } from "lucide-react";

// Avatar with three orbiting icon badges: mobile, web, AI.
export default function HeroAvatar({ src, alt }) {
  return (
    <div className="hero-orbit">
      <span className="orbit-ring" aria-hidden="true" />
      <Image src={src} alt={alt} width={120} height={120} priority className="hero-avatar" />
      <span className="orbit-badge orbit-a" aria-hidden="true"><Smartphone size={18} strokeWidth={1.8} /></span>
      <span className="orbit-badge orbit-b" aria-hidden="true"><Globe size={18} strokeWidth={1.8} /></span>
      <span className="orbit-badge orbit-c" aria-hidden="true"><Sparkles size={18} strokeWidth={1.8} /></span>
    </div>
  );
}
