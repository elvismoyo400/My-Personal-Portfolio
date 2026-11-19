# Elvis Moyo — Developer Portfolio

A modern, responsive personal portfolio built with **Next.js, TypeScript, and CSS** to showcase my journey as a Junior Full-Stack Developer.

The portfolio features a clean interface, dark theme with cyan accents, animated particle effects, and dedicated sections highlighting my background, technical skills, experience, and selected projects.

## Live Portfolio

Visit my portfolio: [Add your deployed website URL here]

## Run Locally

Clone the repository and install the dependencies:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Technologies Used

- Next.js
- React
- TypeScript
- CSS3
- HTML5
- JavaScript
- Git & GitHub

## Portfolio Sections

- **Home:** Introduction and professional overview.
- **About:** My background, development journey, and interests.
- **Experience:** My learning journey and practical development experience.
- **Skills:** Technologies and tools I work with.
- **Projects:** Selected personal and collaborative projects.
- **Contact:** A way for recruiters, developers, and potential clients to get in touch.

## Customization

- Update portfolio content, skills, experience, and project information in `app/page.tsx`.
- Customize colors, typography, animations, and responsive styling in `app/globals.css`.
- Update the page title and SEO description in `app/layout.tsx`.
- Replace portfolio images and assets in the `public` directory.
- Update branding assets such as `app/icon.svg`, `app/apple-icon.png`, and `app/opengraph-image.jpg`.

## Validate and Build

Run the following commands before deployment:

```bash
npm run lint
npm run build
```

## Contact Form Delivery

The contact form uses [Resend](https://resend.com) to deliver messages.

To enable email delivery:

1. Create a Resend account.
2. Verify your sending domain.
3. Add the following environment variables to `.env.local`:

```env
RESEND_API_KEY=re_your_api_key
RESEND_FROM_EMAIL="Elvis Moyo <contact@your-verified-domain.com>"
```

4. Configure the same environment variables in your deployment provider.

**Important:** Never expose your API key in client-side code or commit `.env.local` to GitHub.

## Connect With Me

- **GitHub:** [github.com/elvismoyo400](https://github.com/elvismoyo400)
- **LinkedIn:** [linkedin.com/in/elvis-moyo-bb289731b](https://linkedin.com/in/elvis-moyo-bb289731b)

---

Built and maintained by **Elvis Moyo**.

*Focused on continuous learning, practical problem-solving, and building meaningful digital solutions.*
