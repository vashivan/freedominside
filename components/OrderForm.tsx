"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries/types";

type Status = "idle" | "submitting" | "success" | "error";

export default function OrderForm({ dict, locale }: { dict: Dictionary["order"]; locale: Locale }) {
  const searchParams = useSearchParams();
  const initialVariant = searchParams.get("variant") || dict.variants[0]?.id || "natural";

  const [variant, setVariant] = useState(initialVariant);
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [novaPoshta, setNovaPoshta] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, city, novaPoshta, variant, quantity, comment, locale }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMsg(dict.errors.generic);
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg(dict.errors.network);
    }
  };

  if (status === "success") {
    return (
      <div className="order-success rise in">
        <span className="stamp">{dict.success.stamp}</span>
        <h2>
          {dict.success.title[0]}
          <br />
          {dict.success.title[1]}
        </h2>
        <p>{dict.success.text}</p>
        <Link className="btn" href={`/${locale}`}>
          <span>{dict.success.back}</span>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Link className="back-link" href={`/${locale}`}>{dict.back}</Link>
      <br />
      <span className="article-kicker">{dict.kicker}</span>
      <h1 className="order-title">
        {dict.titleLine1}
        <br />
        {dict.titleLine2}
      </h1>
      <p className="order-sub">{dict.sub}</p>

      <form className="order-form" onSubmit={onSubmit}>
      <div className="order-field-group">
        <span className="order-label">{dict.colorwayLabel}</span>
        <div className="order-variants">
          {dict.variants.map((v) => (
            <label key={v.id} className={`order-variant${variant === v.id ? " selected" : ""}`}>
              <input
                type="radio"
                name="variant"
                value={v.id}
                checked={variant === v.id}
                onChange={() => setVariant(v.id)}
              />
              <span className="ov-name">{v.label}</span>
              <span className="ov-status">{v.status}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="order-row">
        <div className="order-field-group">
          <label className="order-label" htmlFor="quantity">{dict.quantityLabel}</label>
          <input
            id="quantity"
            type="number"
            min={1}
            max={10}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
            required
          />
        </div>
      </div>

      <div className="order-row">
        <div className="order-field-group">
          <label className="order-label" htmlFor="name">{dict.nameLabel}</label>
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="order-field-group">
          <label className="order-label" htmlFor="phone">{dict.phoneLabel}</label>
          <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
      </div>

      <div className="order-row">
        <div className="order-field-group">
          <label className="order-label" htmlFor="city">{dict.cityLabel}</label>
          <input id="city" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div className="order-field-group">
          <label className="order-label" htmlFor="novaPoshta">{dict.npLabel}</label>
          <input id="novaPoshta" type="text" value={novaPoshta} onChange={(e) => setNovaPoshta(e.target.value)} />
        </div>
      </div>

      <div className="order-field-group">
        <label className="order-label" htmlFor="comment">{dict.commentLabel}</label>
        <textarea id="comment" rows={3} value={comment} onChange={(e) => setComment(e.target.value)} />
      </div>

      {status === "error" && <p className="order-error">{errorMsg}</p>}

      <button className="btn" type="submit" disabled={status === "submitting"}>
        <span>{status === "submitting" ? dict.submitting : dict.submit}</span>
      </button>
      </form>
    </>
  );
}