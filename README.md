# Nitish Poonia — Portfolio

Built with **Next.js 14**, **Tailwind CSS**, and **Montserrat** font.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Adding Your Portrait

1. Place your photo at `/public/portrait.jpg`
2. In `app/page.js`, find the comment `TO ADD YOUR PHOTO` in the Hero section
3. Replace the placeholder `<div>` with:

```jsx
import Image from 'next/image'  // add at top of file

// Replace placeholder div with:
<Image
  src="/portrait.jpg"
  alt="Nitish Poonia"
  fill
  className="object-cover object-top grayscale"
  priority
/>
```

## Reusable Components

| Component | Purpose |
|-----------|---------|
| `SectionLabel` | Small uppercase label above headings |
| `Divider` | Thin horizontal rule between sections |
| `SkillPill` | Skill tag — `proficient` prop for filled style |
| `ProjectCard` | Expandable project card with feature list |
| `NavBar` | Sticky nav that fades in on scroll |

## Adding a New Project

In `app/page.js`, add an object to the `projects` array:

```js
{
  number: 4,
  title: 'Your Project Title',
  summary: 'One line description.',
  slug: 'your-project-slug',      // for future detail pages
  features: ['Feature one', 'Feature two'],
}
```

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com) for automatic deploys.
