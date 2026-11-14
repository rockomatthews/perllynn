import { test, expect } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const viewports = [
  { name: "small-phone", width: 320, height: 568 },
  { name: "android-phone", width: 360, height: 640 },
  { name: "iphone", width: 390, height: 844 },
  { name: "large-phone", width: 430, height: 932 },
  { name: "landscape", width: 844, height: 390 },
  { name: "tablet", width: 768, height: 1024 },
];
for (const viewport of viewports) {
  test(`${viewport.name}: headings, touch targets, carousel swipe and form stay usable`, async ({
    page,
  }, info) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const heading = await page.locator("h1").boundingBox();
    expect(heading!.x).toBeGreaterThanOrEqual(0);
    expect(heading!.x + heading!.width).toBeLessThanOrEqual(viewport.width + 1);
    const cta = await page.locator(".hero-first .button").boundingBox();
    expect(cta!.y + cta!.height).toBeLessThanOrEqual(viewport.height + 1);
    expect(
      (await page.locator(".nav-contact").boundingBox())!.height,
    ).toBeGreaterThanOrEqual(44);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const carousel = page.locator(".chicago-carousel");
    await carousel.scrollIntoViewIfNeeded();
    await carousel.dispatchEvent("pointerdown", {
      clientX: 70,
      clientY: 200,
      pointerType: "touch",
    });
    await carousel.dispatchEvent("pointerup", {
      clientX: 200,
      clientY: 202,
      pointerType: "touch",
    });
    await expect(carousel).toHaveAttribute(
      "data-active-place",
      "Millennium Park",
    );
    await page.locator("#contact").scrollIntoViewIfNeeded();
    if (viewport.width <= 700) {
      expect(
        await page
          .locator('input[name="email"]')
          .evaluate((el) => parseFloat(getComputedStyle(el).fontSize)),
      ).toBeGreaterThanOrEqual(16);
    }
    for (const name of ["fullName", "email", "message"]) {
      const input = page.locator(`[name="${name}"]`);
      const box = await input.boundingBox();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(viewport.width + 1);
    }
    if (viewport.name === "small-phone" || viewport.name === "landscape") {
      await page.evaluate(() =>
        window.scrollTo({ top: 0, behavior: "instant" }),
      );
      await page.screenshot({
        path: `artifacts/${info.project.name}-${viewport.name}.png`,
      });
    }
  });
}

test("iMessage metadata exposes one absolute high-resolution image to crawlers", async ({
  page,
  request,
}, info) => {
  await page.goto("/");
  const image = page.locator('meta[property="og:image"]');
  await expect(image).toHaveCount(1);
  const url = (await image.getAttribute("content"))!;
  expect(url).toMatch(/^https?:\/\//);
  await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute(
    "content",
    "2400",
  );
  await expect(
    page.locator('meta[property="og:image:height"]'),
  ).toHaveAttribute("content", "1260");
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
    "content",
    url,
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary_large_image",
  );
  const imageUrl = new URL(url);
  const response = await request.get(imageUrl.pathname + imageUrl.search);
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("image/png");
  const bytes = await response.body();
  expect(bytes.readUInt32BE(16)).toBe(2400);
  expect(bytes.readUInt32BE(20)).toBe(1260);
  expect(bytes.length).toBeLessThan(5 * 1024 * 1024);
  const bot = await request.get("/", {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; Applebot/0.1; +http://www.apple.com/go/applebot)",
    },
  });
  expect(await bot.text()).toContain(url.replaceAll("&", "&amp;"));
  if (info.project.name === "desktop") {
    await mkdir("artifacts", { recursive: true });
    await writeFile("artifacts/imessage-preview.png", bytes);
  }
});
