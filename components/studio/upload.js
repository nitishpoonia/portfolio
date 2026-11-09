// Resize in the browser (max 1600px, WebP) before uploading, so posts stay fast
// and the database stays small. GIFs are uploaded as-is to keep animation.
const MAX_SIDE = 1600;

const toBlob = (canvas, type, q) => new Promise((r) => canvas.toBlob(r, type, q));
const toBase64 = (blob) =>
  new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(String(fr.result).split(",")[1]);
    fr.onerror = reject;
    fr.readAsDataURL(blob);
  });

export async function uploadImage(file) {
  if (!file?.type?.startsWith("image/") || file.type === "image/svg+xml") {
    throw new Error("Only JPG, PNG, WebP, GIF or AVIF images");
  }
  let blob = file, width, height;
  if (file.type !== "image/gif") {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, MAX_SIDE / Math.max(bmp.width, bmp.height));
    width = Math.round(bmp.width * scale);
    height = Math.round(bmp.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d").drawImage(bmp, 0, 0, width, height);
    blob = (await toBlob(canvas, "image/webp", 0.82)) || blob;
    if (blob.type !== "image/webp") blob = (await toBlob(canvas, "image/jpeg", 0.85)) || file;
  }
  const res = await fetch("/api/studio/media", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: file.name, type: blob.type, width, height, data: await toBase64(blob) }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error || "Upload failed");
  return json.url;
}

export const altFromName = (name = "") =>
  name.replace(/\.[a-z0-9]+$/i, "").replace(/[-_]+/g, " ").trim();
