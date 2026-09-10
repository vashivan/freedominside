import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import RevealImage from "@/components/RevealImage";
import Filmstrip from "@/components/Filmstrip";
import PlayButton from "@/components/PlayButton";
import OutlineTitle from "@/components/OutlineTitle";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Home({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Header locale={locale} dict={dict} />

      {/* 01 — HERO */}
      <section className="hero">
        <span className="issue-badge">{dict.issueTag}</span>
        <div className="hero-grid">
          <h1 className="hero-h1">
            <span className="l1">{dict.hero.l1}</span>
            <span className="l2">{dict.hero.l2}</span>
            <span className="l3">{dict.hero.l3}</span>
          </h1>
          <div className="hero-sticker">
            {dict.hero.sticker[0]}
            <br />
            {dict.hero.sticker[1]}
            <br />
            {dict.hero.sticker[2]}
          </div>
          <RevealImage
            className="hero-photo in"
            overlay={
              <>
                <div className="tape" />
                <div className="tape b" />
                {/* <span className="hero-tagline">{dict.hero.tagline}</span> */}
              </>
            }
          >
            <Image
              src="/assets/img1.png"
              alt={dict.hero.photoAlt}
              fill
              sizes="(max-width: 900px) 100vw, 60vw"
              priority
            />
          </RevealImage>
        </div>
      </section>

      {/* 02 — MANIFESTO */}
      <section className="manifesto chapter" id="manifesto">
        <Reveal as="div" className="chapter-head">
          <span className="chapter-num">{dict.manifesto.chapterNum}</span>
          <h2>
            <OutlineTitle text={dict.manifesto.title} />
          </h2>
        </Reveal>
        <div className="zine-spread">
          <Reveal as="p" className="zine-lede">
            {dict.manifesto.lede[0]}
            <mark>{dict.manifesto.lede[1]}</mark>
            {dict.manifesto.lede[2]}
          </Reveal>
          <RevealImage className="zine-photo" overlay={<div className="tape" />}>
            <Image
              src="/assets/img12.jpg"
              alt={dict.manifesto.photoAlt}
              fill
              sizes="40vw"
            />
          </RevealImage>
          <div className="zine-cols">
            {dict.manifesto.cols.map((col) => (
              <Reveal as="div" className="zine-col" key={col.title}>
                <span className="num">{col.num}</span>
                <h5>{col.title}</h5>
                <p>{col.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* 04 — THE FIRST DROP */}
      <section className="drop chapter" id="drop">
        <Reveal as="div" className="chapter-head">
          <span className="chapter-num">{dict.drop.chapterNum}</span>
          <h2>
            <OutlineTitle text={dict.drop.title} />
          </h2>
        </Reveal>
        <div className="drop-grid">
          <RevealImage
            className="drop-media"
            overlay={
              <>
                <div className="tape" />
                <div className="drop-price-sticker">
                  <span className="amt">{dict.drop.price}</span>
                  <span className="lbl">{dict.drop.sizeLabel}</span>
                </div>
              </>
            }
          >
            <Image
              src="/assets/img7.png"
              alt={dict.drop.productAlt}
              fill
              sizes="(max-width: 920px) 100vw, 55vw"
            />
          </RevealImage>
          <Reveal as="div" className="drop-info">
            <span className="kicker">{dict.drop.kicker}</span>
            <h3>{dict.drop.name}</h3>
            <p className="desc">{dict.drop.desc}</p>
            <div className="spec-list">
              {dict.drop.specs.map((spec) => (
                <div className="spec-row" key={spec.k}>
                  <span className="k">{spec.k}</span>
                  <span className="v">{spec.v}</span>
                </div>
              ))}
            </div>
            <div className="drop-cta-row">
              <Link className="btn" href={`/${locale}/order`}><span>{dict.drop.cta}</span></Link>
              <span className="stamp">{dict.drop.limitedRun}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 05 — GALLERY */}
      <section className="gallery" id="gallery">
        <div className="chapter" style={{ paddingBottom: 0 }}>
          <Reveal as="div" className="chapter-head">
            <span className="chapter-num on-dark">{dict.gallery.chapterNum}</span>
            <h2 className="on-dark">
              <OutlineTitle text={dict.gallery.title} dark />
            </h2>
          </Reveal>
        </div>
        <div className="filmstrip-wrap">
          <Filmstrip>
            {(() => {
              const images = [
                "/assets/img8.JPG",
                "/assets/img11.JPG",
                "/assets/img3.png",
                "/assets/img7.JPG",
                "/assets/img12.JPG",
                "/assets/img10.JPG"
              ];
              return dict.gallery.items.map((item, i) => (
                <RevealImage className="fs-item" key={item.cap}>
                  <Image src={images[i]} alt={item.alt} fill sizes="480px" />
                </RevealImage>
              ));
            })()}
          </Filmstrip>
        </div>
        <div className="filmstrip-hint" style={{ color: "var(--cream)" }}>
          <span>{dict.gallery.dragHint}</span>
          <span>{dict.gallery.countHint}</span>
        </div>
      </section>

      {/* 06 — CRAFT */}
      {/* <section className="craft chapter" id="craft">
        <Reveal as="div" className="chapter-head">
          <span className="chapter-num">{dict.craft.chapterNum}</span>
          <h2>
            <OutlineTitle text={dict.craft.title} />
          </h2>
        </Reveal>
        <div className="craft-grid">
          {(() => {
            const images = [
              "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1000&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?q=80&w=1000&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop",
            ];
            return dict.craft.items.map((item, i) => (
              <Reveal as="div" className="craft-item" key={item.title}>
                <RevealImage className="craft-media" overlay={<div className="tape" />}>
                  <Image src={images[i]} alt={item.alt} fill sizes="33vw" />
                </RevealImage>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </Reveal>
            ));
          })()}
        </div>
      </section> */}

      {/* 07 — SHOP */}
      <section className="shop chapter" id="shop">
        <Reveal as="div" className="chapter-head">
          <span className="chapter-num on-dark">{dict.shop.chapterNum}</span>
          <h2 className="on-dark">
            <OutlineTitle text={dict.shop.title} dark />
          </h2>
        </Reveal>
        <div className="shop-grid">
          {(() => {
            const images: Record<string, string> = {
              natural: "/assets/img4.png",
              charcoal: "/assets/img7.png",
            };
            return dict.shop.items.map((item) => (
              <Reveal as="div" className="shop-item" key={item.variant}>
                <RevealImage className="shop-media" overlay={<div className="tape" />}>
                  <Image src={images[item.variant]} alt={item.alt} fill sizes="33vw" />
                </RevealImage>
                <span className="status">{item.status}</span>
                <h4>{item.name}</h4>
                <span className="price">{dict.shop.price}</span>
                <Link className="btn" href={`/${locale}/order?variant=${item.variant}`}><span>{item.cta}</span></Link>
              </Reveal>
            ));
          })()}
        </div>
      </section>

      <Footer locale={locale} dict={dict} />
    </>
  );
}
