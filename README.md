# House of Prayer Church website

The new houseofprayer.org, built for first-time visitors. It shares its look with [hopworship.com](https://hopworship.com): Inter type, HOP red (#AC0C2F), dark photo sections and pill buttons.

Built with React, Vite and Tailwind CSS. No backend is needed.

## Pages

| Page | Path |
| --- | --- |
| Home | `/` |
| Plan Your Visit (with visit sign-up form) | `/plan-your-visit` |
| About | `/about` |
| Ministries | `/ministries` |
| Watch | `/watch` |
| Events | `/events` |
| Give | `/give` |
| Contact | `/contact` |
| Visit form thank-you (for Google Ad Grant tracking) | `/thank-you` |

## Run it locally

```
npm install
npm run dev
```

## Deploy on Cloudflare Pages

1. In Cloudflare, go to **Workers & Pages › Create › Pages › Connect to Git** and pick this repo.
2. Framework preset: **Vite**. Build command: `npm run build`. Output folder: `dist`.
3. Optional: add the environment variable `VITE_FORM_ENDPOINT` (see Forms below).
4. Deploy, then add the custom domain under **Custom domains**.

`public/_redirects` sends every path to the app, so links like `/about` work when opened directly.

## Where to change things

- **Church facts** (service times, addresses, phone, ministries, leaders, events, giving link): `src/data/church.js`. Anything marked `CONFIRM` needs a check.
- **Photos**: every grey box labelled "Photo: ..." is a placeholder. Put images in `public/images/` and swap the `PhotoSlot` for an `<img>`.
- **Text in brackets** like `[90 minutes]` is a placeholder for the church office to fill in.

## Forms

The Plan Your Visit and Contact forms send to a form service if `VITE_FORM_ENDPOINT` is set (for example a Formspree form URL). Until then, they open the visitor's email app with the details filled in, addressed to churchoffice@houseofprayer.org.
