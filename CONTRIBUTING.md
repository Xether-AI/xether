# Contributing to Xether AI Website

Thank you for contributing to the **Xether AI** marketing website and auth portal.

## Local Development

```bash
npm ci
npm run dev
```

The app runs in **light-only mode** with Next.js 16, Tailwind CSS v4, and `next-intl` localization (`en`, `fr`, `es`).

## Branching & Atomic Commits

- Keep commits small, focused, and atomic using Conventional Commits (`feat`, `fix`, `style`, `refactor`, `test`, `ci`, `docs`, `chore`).
- Pull request titles must also follow Conventional Commits (enforced by `.github/workflows/pr-checks.yml`).

## Internationalization (`en`, `fr`, `es`)

All user-facing copy lives in:

- `messages/en.json`
- `messages/fr.json`
- `messages/es.json`

Locale selection is cookie-backed (`XETHER_LOCALE`, defaulting to `Accept-Language` resolution and `en`) via `POST /api/locale` and the footer globe switcher. Whenever you add or rename a key in one dictionary, update all three files—unit tests enforce strict key parity across `en`, `fr`, and `es`.

## Pre-PR Verification

Run all checks locally before opening a pull request:

```bash
npx tsc --noEmit
npm run lint
npm run test
npm run build
```

For end-to-end verification in Chromium:

```bash
npx playwright test --project=chromium
```

## Licensing

By contributing to Xether AI, you agree that your contributions will be licensed under the terms of `LICENSE`.
