# Freedom Inside — Next.js

A single-product landing page for the Freedom Inside Corner 5-Panel cap, in Ukrainian (default) and
English, plus an order form that sends submissions straight to a Telegram chat.

## Languages

- **Ukrainian is the default** — `/` redirects to `/uk`.
- **English lives at `/en`.**
- The header has a `UK / EN` switch that jumps to the same page in the other language.
- Which language a first-time visitor lands on is decided by their browser's `Accept-Language`
  header (see `middleware.ts`) — Ukrainian unless the browser clearly prefers English.

### Where the text lives

Every string on the site lives in `lib/dictionaries/uk.ts` and `lib/dictionaries/en.ts`, both typed
against `lib/dictionaries/types.ts`. Nothing is hardcoded in the components or pages — to change
copy, edit the dictionary, not the JSX. To add a third language:

1. Add its code to `locales` in `lib/i18n.ts`.
2. Create `lib/dictionaries/<code>.ts` matching the `Dictionary` type (TypeScript will flag any
   missing keys).
3. Register it in the `loaders` map in `lib/dictionaries/index.ts`.

### About the fonts

The original design used Anton / Archivo / Space Mono / Permanent Marker — all four are Latin-only
and don't include Cyrillic glyphs, which would break every Ukrainian headline (silent fallback to a
system font). They've been swapped for closest-match fonts that do ship a Cyrillic subset:

| Role | Was | Now |
|---|---|---|
| Display / headlines | Anton | **Oswald** (bold 700, to match Anton's heavy weight) |
| Body copy | Archivo | **Manrope** |
| Mono / stamps / labels | Space Mono | **JetBrains Mono** |
| Handwritten accents | Permanent Marker | **Caveat** (bold 700) |

All four load via `next/font/google` in `app/[locale]/layout.tsx`.

## Structure

```
middleware.ts               redirects "/" → "/uk" or "/en" based on Accept-Language
lib/
  i18n.ts                    locale list + default locale
  dictionaries/
    types.ts                 shared Dictionary type
    uk.ts / en.ts             the actual copy for each language
    index.ts                  getDictionary(locale) loader
app/
  [locale]/
    layout.tsx               root layout (fonts, cursor, html lang=)
    page.tsx                 the landing page
    order/page.tsx           order page shell
  api/
    order/route.ts           receives order POSTs, forwards to Telegram (outside the locale segment)
  globals.css                full design system
components/
  Header.tsx / Footer.tsx     locale-aware nav + footer, incl. the UK/EN switch
  OutlineTitle.tsx            outlines a heading's last character (language-agnostic version of the
                              old hardcoded split spans)
  Cursor.tsx                   crosshair custom cursor (client component)
  Reveal.tsx / RevealImage.tsx polymorphic scroll-reveal + the `.clip` image mask with a separate
                              `overlay` slot for tape/stickers/captions
  Filmstrip.tsx                draggable horizontal-scroll gallery (client component)
  PlayButton.tsx                campaign film play/pause label toggle, labels passed as props
  OrderForm.tsx                 the order form (client component), fully driven by dict.order
public/
  assets/real-bench-golden-hour.jpg   the one real product photo currently wired in
```

## Order → Telegram setup

1. **Create a bot.** Message [@BotFather](https://t.me/BotFather) on Telegram, run `/newbot`, follow
   the prompts. It gives you a token that looks like `123456789:AA...` — that's `TELEGRAM_BOT_TOKEN`.
2. **Get the chat ID to notify.**
   - Personal chat: message your bot anything, then open
     `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates` — the numeric ID is under `message.chat.id`.
   - Group: add the bot to the group, send a message there, hit the same URL — the group's ID will be
     negative (e.g. `-1001234567890`).
3. Copy `.env.example` to `.env.local` and fill in both values.

The Telegram message itself is always written in Ukrainian (for whoever's reading it on the other
end) regardless of which site language the order came from — it just adds a small "Site language: EN"
note when the customer ordered from the English version. Edit `VARIANT_LABELS` / the `lines` array in
`app/api/order/route.ts` if you'd rather change that.

## Run it

```bash
npm install
cp .env.example .env.local   # then fill in your bot token + chat id
npm run dev
```

Open http://localhost:3000 — it redirects to http://localhost:3000/uk.

## Notes

- All interactive bits (cursor, scroll reveals, the draggable gallery, the play button, the order
  form) are isolated into small `"use client"` components; everything else renders as a React Server
  Component.
- There's no blog/journal/articles section — this is a single product landing page plus its order
  flow, on purpose.
# freedominside
