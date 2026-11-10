import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import readingTime from "reading-time";
import { isAdmin } from "@/lib/auth";
import { getPreview } from "@/lib/preview";
import { getContact } from "@/lib/site";
import { articleOptions, mdxComponents, tableOfContents, mediaIdsIn } from "@/lib/mdx";
import { getMediaSizes } from "@/lib/media";
import { tagsOf } from "@/lib/format";
import { links as parseLinks } from "@/lib/validate";

const safeLinks = (v) => {
  try {
    return parseLinks(v);
  } catch {
    return [];
  }
};
import { PostArticle, ProjectArticle } from "@/components/ArticleViews";
import Navbar from "@/components/NavBar";
import SiteFooter from "@/components/SiteFooter";

export const dynamic = "force-dynamic";
export const metadata = { title: "Preview", robots: { index: false, follow: false } };


// Studio preview of unsaved editor content. proxy.js already requires a login
// for /preview; the isAdmin check here is a second lock.
export default async function PreviewPage({ params }) {
  if (!(await isAdmin())) notFound();
  const { token } = await params;
  const preview = await getPreview(token);
  if (!preview) notFound();

  const d = preview.data;
  const content = String(d.content || "");
  let body;
  try {
    const media = await getMediaSizes(mediaIdsIn(content));
    ({ content: body } = await compileMDX({ source: content, options: articleOptions({ media }), components: mdxComponents }));
  } catch (e) {
    body = (
      <div role="alert">
        <p><strong>This content won&apos;t render on the live site yet.</strong></p>
        <p>{String(e.message).split("\n")[0]}</p>
        <p>Usually a stray <code>&lt;</code>, <code>{"{"}</code> or <code>{"}"}</code> in the text. Wrap it in <code>inline code</code> or remove it.</p>
      </div>
    );
  }

  const item = { ...d, title: d.title || "Untitled", tags: tagsOf(d.tags), links: safeLinks(d.links) };
  const article =
    preview.kind === "post" ? (
      <PostArticle
        post={{ ...item, date: d.date || new Date().toISOString().slice(0, 10), readingTime: readingTime(content).text }}
        body={body}
        toc={tableOfContents(content)}
        linkTags={false}
      />
    ) : (
      <ProjectArticle project={item} contact={await getContact()} body={body} toc={tableOfContents(content)} />
    );

  return (
    <div className="page-shell">
      <Navbar />
      <main id="main" className="page-main page-narrow">{article}</main>
      <SiteFooter />
      <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#0A0A0A] px-5 py-2.5 text-sm text-white shadow-lg">
        Preview · {d.published ? "unsaved changes to a live page" : "not published"}
      </div>
    </div>
  );
}
