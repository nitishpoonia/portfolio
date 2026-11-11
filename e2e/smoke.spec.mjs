import { test, expect } from "@playwright/test";

// Every public page renders, has its main heading, and throws no browser errors.
const PAGES = [
  ["/", /Nitish/],
  ["/story", /How I got here/],
  ["/projects", /Things I’ve built/],
  ["/projects/nfc-time-tracking", /NFC/],
  ["/blog", /Notes from building/],
  ["/blog/how-to-fix-flatlist-performance", /FlatList/],
  ["/hire", /Looking for my next team/],
  ["/uses", /What I use/],
];

for (const [path, heading] of PAGES) {
  test(`renders ${path}`, async ({ page }) => {
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    const res = await page.goto(path);
    expect(res.status()).toBe(200);
    await expect(page.locator("h1")).toContainText(heading);
    await expect(page.locator("#main")).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test("unknown page is a 404 with the site shell", async ({ page }) => {
  const res = await page.goto("/definitely-not-a-page");
  expect(res.status()).toBe(404);
  await expect(page.locator("nav[aria-label=Main]")).toBeVisible();
});

test("blog tabs and tags work from the URL", async ({ page }) => {
  await page.goto("/blog?tab=personal");
  await expect(page.locator("#blog-tab-personal")).toHaveAttribute("aria-selected", "true");
  await page.goto("/blog?tag=performance");
  await expect(page.locator(".tag-filter")).toContainText("performance");
});

test("post has contents, code copy and related posts", async ({ page }) => {
  await page.goto("/blog/how-to-fix-flatlist-performance");
  const first = page.locator(".toc-rail a").first();
  const id = (await first.getAttribute("href")).slice(1);
  await expect(page.locator(`[id="${id}"]`)).toHaveCount(1);
  await expect(page.locator(".code-copy").first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "Keep reading" })).toBeVisible();
});

test("phone layout: nothing wider than the screen, contents box works", async ({ browser }) => {
  const page = await (await browser.newContext({ viewport: { width: 375, height: 812 } })).newPage();
  for (const path of ["/", "/story", "/projects", "/blog", "/hire", "/blog/how-to-fix-flatlist-performance"]) {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, `${path} scrolls sideways`).toBeLessThanOrEqual(0);
  }
  await page.locator(".toc summary").click();
  await expect(page.locator(".toc a").first()).toBeVisible();
});

test("feed, sitemap, robots and manifest respond", async ({ request }) => {
  for (const [path, type] of [["/feed.xml", "rss"], ["/sitemap.xml", "xml"], ["/robots.txt", "text"], ["/manifest.webmanifest", "manifest"]]) {
    const res = await request.get(path);
    expect(res.status(), path).toBe(200);
    expect(res.headers()["content-type"], path).toContain(type);
  }
});

test("Studio is locked without a login", async ({ page, request }) => {
  await page.goto("/studio");
  await expect(page).toHaveURL(/\/studio\/login$/);
  expect((await request.get("/api/studio/export")).status()).toBe(401);
});
