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
  await page.getByRole("link", { name: "Features" }).first().click();
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

test("theme toggle switches between dark and light mode", async ({ page }) => {
  await page.goto("/");
  const html = page.locator("html");
  const toggleBtn = page.getByRole("button", {
    name: /Switch to (light|dark) mode/,
  });
  await toggleBtn.click();
  await expect(html).toHaveClass(/(light|dark)/);
});
