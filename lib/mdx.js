import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import GithubSlugger from "github-slugger";
import NfcTimerDemo from "@/components/NfcTimerDemo";
import CodeBlock from "@/components/CodeBlock";

// Same MDX setup for public pages and Studio preview.
//   - every h2/h3 gets an id and becomes a link to itself (rehype-slug + autolink)
//   - code is highlighted at build time (rehype-pretty-code) and gets a copy button (CodeBlock)
//   - images get their real width/height when known, and load lazily
export function articleOptions({ media = {} } = {}) {
  return {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap", properties: { className: ["heading-link"] } }],
        [rehypePrettyCode, { theme: "github-light", keepBackground: true }],
        [rehypeImages, { media }],
      ],
    },
  };
}

export const mdxOptions = articleOptions();

// Custom components available inside any body.
export const mdxComponents = { NfcTimerDemo, pre: CodeBlock };

// ---------------------------------------------------------------------------

// Headings for the table of contents, with the same ids rehype-slug will give
// them. Skips fenced code. Inline markdown is stripped to match the rendered text.
export function tableOfContents(markdown = "") {
  const slugger = new GithubSlugger();
  const out = [];
  let fence = null;
  for (const line of String(markdown).split("\n")) {
    const f = line.match(/^\s*(```+|~~~+)/);
    if (f) {
      if (!fence) fence = f[1][0];
      else if (f[1][0] === fence) fence = null;
      continue;
    }
    if (fence) continue;
    const m = line.match(/^(#{2,3})\s+(.+?)\s*#*\s*$/);
    if (!m) continue;
    const text = m[2]
      .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/`([^`]*)`/g, "$1")
      .replace(/(\*\*|__|\*|_|~~)(.*?)\1/g, "$2")
      .trim();
    out.push({ depth: m[1].length, text, id: slugger.slug(text) });
  }
  return out;
}

// Ids of images uploaded through Studio (/media/<id>) used in a body.
export const mediaIdsIn = (markdown = "") => [...new Set([...String(markdown).matchAll(/\/media\/([A-Za-z0-9_-]{6,32})/g)].map((m) => m[1]))];

// rehype plugin: width/height from the media table for /media/<id> images, and lazy loading for all.
function rehypeImages({ media }) {
  const walk = (node) => {
    if (node.type === "element" && node.tagName === "img") {
      const p = (node.properties ||= {});
      const id = String(p.src || "").match(/^\/media\/([A-Za-z0-9_-]+)$/)?.[1];
      const size = id && media[id];
      if (size?.width && size?.height && !p.width) {
        p.width = size.width;
        p.height = size.height;
      }
      p.loading ??= "lazy";
      p.decoding ??= "async";
    }
    node.children?.forEach(walk);
  };
  return walk;
}
