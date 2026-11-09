import rehypePrettyCode from "rehype-pretty-code";
import NfcTimerDemo from "@/components/NfcTimerDemo";

// Same MDX setup for public pages and Studio preview.
export const mdxOptions = {
  mdxOptions: {
    rehypePlugins: [[rehypePrettyCode, { theme: "github-light", keepBackground: true }]],
  },
};

// Custom components available inside any body.
export const mdxComponents = { NfcTimerDemo };
