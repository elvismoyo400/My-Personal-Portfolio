# Vishnu Rohith B — Portfolio

A responsive Next.js portfolio with a dark theme, lime accents, a CSS particle
hero, and sections for the journey, experience, skills, and selected work.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customize

- Update the portfolio text, skills, and project cards in `app/page.tsx`.
- Adjust colors, typography, and responsive styles in `app/globals.css`.
- Update the page title and SEO description in `app/layout.tsx`.
- Replace `public/Vishnu_Rohith_B.pdf` with the latest CV.
- Replace `app/icon.svg`, `app/apple-icon.png`, and
  `app/opengraph-image.jpg` to update the portfolio branding.

## Validate and build

```bash
npm run lint
npm run build
```

## Contact form delivery

The contact form sends messages through [Resend](https://resend.com). Verify a
sender domain in Resend, then add these server-only variables to `.env.local`:

```env
RESEND_API_KEY=re_your_api_key
RESEND_FROM_EMAIL="Portfolio <contact@your-verified-domain.com>"
```

Set the same variables in your deployment provider and redeploy. Do not prefix
the API key with `NEXT_PUBLIC_` or commit it to source control. The form sends
to `elvismoyo400@gmail.com`; replies go to the sender's email address.
