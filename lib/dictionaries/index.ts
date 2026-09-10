import "server-only";
import type { Locale } from "../i18n";
import type { Dictionary } from "./types";

const loaders: Record<Locale, () => Promise<Dictionary>> = {
  uk: () => import("./uk").then((m) => m.default),
  en: () => import("./en").then((m) => m.default),
};

export function getDictionary(locale: Locale): Promise<Dictionary> {
  return loaders[locale]();
}
