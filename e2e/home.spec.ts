import { test, expect } from "@playwright/test";

test("landing page has title, hero, and interactive dashboard preview", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Xether AI/);

  const heroHeading = page.locator("h1");
  await expect(heroHeading).toBeVisible();

  await expect(page.getByText("churn_training_prep_v4")).toBeVisible();
});

test("navigation to features section", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Platform" }).first().click();
  await expect(page).toHaveURL(/.*#features-section/);
});

test("auth pages render cleanly", async ({ page }) => {
  await page.goto("/login");
  await expect(page.getByRole("heading", { name: "Welcome back" })).toBeVisible();

  await page.goto("/signup");
  await expect(
    page.getByRole("heading", { name: "Create your account" }),
  ).toBeVisible();

  await page.goto("/forgot-password");
  await expect(
    page.getByRole("heading", { name: "Reset your password" }),
  ).toBeVisible();
});

test("contact and api pages render cleanly", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByRole("heading", { name: "Contact sales" })).toBeVisible();

  await page.goto("/api");
  await expect(page.getByRole("heading", { name: "API Reference" })).toBeVisible();
});

test("website enforces light-only mode without a dark-mode toggle", async ({ page }) => {
  await page.goto("/");
  const html = page.locator("html");
  await expect(html).not.toHaveClass(/\bdark\b/);
  await expect(
    page.getByRole("button", { name: /Switch to (light|dark) mode/ }),
  ).toHaveCount(0);
});

test("footer globe language switcher switches locale to French", async ({ page }) => {
  await page.goto("/");

  const switcher = page.getByTestId("language-switcher");
  await expect(switcher).toBeVisible();
  await expect(switcher).toContainText("EN");

  await switcher.click();
  await expect(page.getByRole("menuitemradio", { name: /English/i })).toBeVisible();
  await expect(page.getByRole("menuitemradio", { name: /Français/i })).toBeVisible();
  await expect(page.getByRole("menuitemradio", { name: /Español/i })).toBeVisible();

  await page.getByRole("menuitemradio", { name: /Français/i }).click();
  await expect(switcher).toContainText("FR");
  await expect(page.getByRole("link", { name: "Plateforme" }).first()).toBeVisible();
});
