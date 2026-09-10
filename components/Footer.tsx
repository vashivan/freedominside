import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries/types";
import OutlineTitle from "./OutlineTitle";

type FooterProps = {
  locale: Locale;
  dict: Dictionary;
  /** Current path with the locale prefix stripped — same convention as Header. */
  switchPath?: string;
};

export default function Footer({ locale, dict, switchPath = "" }: FooterProps) {
  const isHome = switchPath === "";
  const f = dict.footer;

  const resolveHref = (linkHref: string) => {
    if (linkHref === "#") return "#";
    if (linkHref.startsWith("#")) return isHome ? linkHref : `/${locale}${linkHref}`;
    if (linkHref === "/order") return `/${locale}/order`;
    return linkHref;
  };

  return (
    <footer id="contact">
      <div className="foot-cta rise in">
        <h2>
          {f.ctaLines[0]}
          <br />
          {f.ctaLines[1]}
          <br />
          <OutlineTitle text={f.ctaLines[2]} />
        </h2>
        <svg className="squiggle in" width="260" height="20">
          <path d="M4 12 Q40 2 80 12 T160 12 T240 10" />
        </svg>
      </div>
      <div className="rule" style={{ marginBottom: 60 }} />
      <div className="foot-grid">
        <div className="foot-brand">
          <span className="logo">
            FREEDOM<span>/</span>INSIDE
          </span>
          <p>{f.tagline}</p>
        </div>
        <div className="foot-col">
          <h5>{f.shopHeading}</h5>
          <ul>
            {f.shopLinks.map((link) => (
              <li key={link.label}><Link href={resolveHref(link.href)}>{link.label}</Link></li>
            ))}
          </ul>
        </div>
        <div className="foot-col">
          <h5>{f.infoHeading}</h5>
          <ul>
            {f.infoLinks.map((link) => (
              <li key={link.label}><Link href={resolveHref(link.href)}>{link.label}</Link></li>
            ))}
          </ul>
        </div>
        <div className="foot-col">
          <h5>{f.followHeading}</h5>
          <ul>
            {f.followLinks.map((link) => (
              <li key={link.label}><Link href={resolveHref(link.href)}>{link.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="foot-bottom">
        <span>{f.bottomLeft}</span>
        <span>{f.bottomRight}</span>
      </div>
    </footer>
  );
}
