import { test, expect } from "@playwright/test";

test("scroll introduction, navigation, mobile layout, and contact feedback", async ({
  page,
}, info) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Independent minds.",
  );
  await expect(page.locator(".hero-image")).toBeVisible();
  await expect
    .poll(() => page.locator(".hero").getAttribute("style"))
    .toContain("--first-opacity");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({ path: `artifacts/${info.project.name}-hero.png` });
  await page.evaluate(() =>
    window.scrollTo({ top: innerHeight * 1.1, behavior: "instant" }),
  );
  await expect(page.locator(".hero")).toHaveAttribute("data-chapter", "2");
  await expect
    .poll(() =>
      page
        .locator(".hero-second")
        .evaluate((el) => Number(getComputedStyle(el).opacity)),
    )
    .toBeGreaterThan(0.9);
  await page.screenshot({ path: `artifacts/${info.project.name}-reveal.png` });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect(page.locator(".hero")).toHaveAttribute("data-chapter", "1");
  for (const section of ["perspective", "network"]) {
    await page
      .locator(`#${section}`)
      .evaluate((element) =>
        element.scrollIntoView({ behavior: "instant", block: "start" }),
      );
    await expect(page.locator(`#${section}`)).toBeInViewport();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `artifacts/${info.project.name}-${section}.png`,
    });
  }
  await page
    .locator("#contact")
    .evaluate((element) =>
      element.scrollIntoView({ behavior: "instant", block: "start" }),
    );
  await page.screenshot({
    path: `artifacts/${info.project.name}-contact-section.png`,
  });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.locator(".nav-contact").click();
  await expect(page.locator("#contact")).toBeInViewport();
  const form = page.locator(".contact-form");
  await form.getByLabel("Your name").fill("Alex Example");
  await form.getByLabel("Email address").fill("alex@example.com");
  await form
    .getByLabel("What would you like to discuss?")
    .fill("I would like an independent perspective on our next decision.");
  await page.route("**/api/contact", (route) =>
    route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({
        error:
          "Our contact form is temporarily unavailable. Please try again later.",
      }),
    }),
  );
  await form.getByRole("button").click();
  await expect(form.getByRole("status")).toContainText(
    "temporarily unavailable",
  );
  await expect(form.getByLabel("Your name")).toHaveValue("Alex Example");
  await page.route("**/api/contact", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    }),
  );
  await form.getByRole("button").click();
  await expect(form.getByRole("status")).toContainText(
    "Thank you for reaching out",
  );
  await expect(form.getByLabel("Your name")).toHaveValue("");
  await page.screenshot({ path: `artifacts/${info.project.name}-contact.png` });
  expect(errors).toEqual([]);
});

test("reduced motion keeps content and contact accessible", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".hero-second")).toBeHidden();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.locator(".nav-contact").click();
  await expect(page.locator("#contact")).toBeInViewport();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
