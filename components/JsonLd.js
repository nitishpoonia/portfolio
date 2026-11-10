// Structured data for search engines (schema.org JSON-LD). "<" is escaped so
// text from a post can't close the script tag.
export default function JsonLd({ data }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
  );
}
