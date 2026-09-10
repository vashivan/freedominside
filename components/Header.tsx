import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries/types";

type HeaderProps = {
  locale: Locale;
  dict: Dictionary;
  /** Current path with the locale prefix stripped, e.g. "" for home, "/order" for the order page. */
  switchPath?: string;
};

export default function Header({ locale, dict, switchPath = "" }: HeaderProps) {
  const isHome = switchPath === "";
  const href = (hash: string) => (isHome ? hash : `/${locale}${hash}`);

  return (
    <header>
      <div className="logo">
        FREEDOM<span>/</span>INSIDE
      </div>
      <nav>
        <ul>
          <li><Link href={href("#manifesto")}>{dict.nav.manifesto}</Link></li>
          <li><Link href={href("#drop")}>{dict.nav.drop}</Link></li>
          <li><Link href={href("#gallery")}>{dict.nav.gallery}</Link></li>
          <li><Link href={href("#craft")}>{dict.nav.craft}</Link></li>
          <li><Link href={href("#shop")}>{dict.nav.shop}</Link></li>
          <li><Link href={`/${locale}/order`}>{dict.nav.order}</Link></li>
        </ul>
      </nav>
      <div className="lang-switch">
        <Link href={`/uk${switchPath}`} className={locale === "uk" ? "active" : ""}>UK</Link>
        <span>/</span>
        <Link href={`/en${switchPath}`} className={locale === "en" ? "active" : ""}>EN</Link>
      </div>
    </header>
  );
}
