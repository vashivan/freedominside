import { NextResponse } from "next/server";

export const runtime = "nodejs";

type OrderPayload = {
  name?: string;
  phone?: string;
  city?: string;
  novaPoshta?: string;
  variant?: string;
  quantity?: string | number;
  comment?: string;
  locale?: string;
};

// The Telegram notification is always written in Ukrainian for the person
// running the shop, regardless of which language the customer ordered in —
// the site language only shows up as a small note at the bottom.
const VARIANT_LABELS: Record<string, string> = {
  natural: "Corner 5-Panel — Натуральний",
  charcoal: "Corner 5-Panel — Вугільний",
  olive: "Corner 5-Panel — Оливковий (очікується)",
};

/** Minimal HTML-escape so user input can't break Telegram's HTML parse mode. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(req: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID env vars.");
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  let body: OrderPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const phone = (body.phone || "").trim();
  const city = (body.city || "").trim();
  const novaPoshta = (body.novaPoshta || "").trim();
  const variant = (body.variant || "").trim();
  const quantity = Number(body.quantity) > 0 ? Number(body.quantity) : 1;
  const comment = (body.comment || "").trim();
  const locale = body.locale === "en" ? "en" : "uk";

  if (!name || !phone || !variant) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const productLabel = VARIANT_LABELS[variant] || variant;

  const lines = [
    "🧢 <b>НОВЕ ЗАМОВЛЕННЯ — FREEDOM INSIDE</b>",
    "",
    `<b>Товар:</b> ${escapeHtml(productLabel)}`,
    `<b>Кількість:</b> ${quantity}`,
    "",
    `<b>Ім'я:</b> ${escapeHtml(name)}`,
    `<b>Телефон:</b> ${escapeHtml(phone)}`,
    city ? `<b>Місто:</b> ${escapeHtml(city)}` : null,
    novaPoshta ? `<b>Відділення Нової Пошти:</b> ${escapeHtml(novaPoshta)}` : null,
    comment ? `<b>Коментар:</b> ${escapeHtml(comment)}` : null,
    locale === "en" ? "" : null,
    locale === "en" ? "<i>Мова сайту: EN</i>" : null,
  ].filter((line) => line !== null);

  const text = lines.join("\n");

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
      }),
    });

    const tgData = await tgRes.json();

    if (!tgRes.ok || !tgData.ok) {
      console.error("Telegram API error:", tgData);
      return NextResponse.json({ ok: false }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Order submission failed:", err);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
