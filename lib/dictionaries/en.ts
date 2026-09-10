import type { Dictionary } from "./types";

const dict: Dictionary = {
  nav: {
    manifesto: "Manifesto",
    drop: "Drop",
    gallery: "Gallery",
    craft: "Craft",
    shop: "Shop",
    order: "Order",
  },
  issueTag: "NO. 001 — KYIV",

  hero: {
    l1: "BORN ON",
    l2: "THE CORNER,",
    l3: "NOT THE RUNWAY.",
    sticker: ["TESTED", "ON THE", "BLOCK"],
    photoAlt: "Freedom Inside cap worn on bench in golden hour light",
    tagline: "Real drop, real golden hour",
    marker: "caps made for concrete, not the catwalk ✎",
    scrollTag: "↓ scroll down",
  },

  manifesto: {
    chapterNum: "01",
    title: "MANIFESTO",
    lede: [
      "We're not selling a lifestyle. We're documenting one. ",
      "Freedom Inside",
      " comes from block parties, broken pavement, subway light and whoever showed up first with a boombox. One cap. Made properly. Worn until it falls apart.",
    ],
    photoAlt: "Weathered brick wall with faded graffiti",
    cols: [
      {
        num: "§ 1",
        title: "NO SEASONS",
        text: "We don't drop on a calendar. We drop when the run is right, not when a spreadsheet says Thursday.",
      },
      {
        num: "§ 2",
        title: "ONE OBJECT",
        text: "A 5-panel cap, hand-embroidered, cut heavy. No 40-SKU catalog pretending to mean something.",
      },
      {
        num: "§ 3",
        title: "MADE TO WEAR OUT",
        text: "Vintage sportswear didn't fake its wear — it earned it. So does this.",
      },
    ],
  },

  film: {
    photoAlt: "Street basketball game at golden hour, campaign film still",
    title: "\u201CCONCRETE HOURS\u201D — the campaign film",
    play: "PLAY",
    playing: "PLAYING",
    shotIn: "SHOT IN KYIV",
    filmTag: "02 — FILM",
  },

  drop: {
    chapterNum: "02",
    title: "THE DROP",
    kicker: "DROP NO. 001",
    productAlt: "Embroidered 5-panel cap, natural cotton, product shot",
    name: "CORNER 5-PANEL",
    desc: "12oz cotton twill, hand-guided embroidery, brass hardware. Cut oversized on purpose — this cap sits the way it should, no adjusting required.",
    specs: [
      { k: "Fabric", v: "12oz heavyweight cotton twill, garment-washed for day-one softness." },
      { k: "Embroidery", v: "Raised tonal thread, hand-guided — no laser precision, no two caps identical." },
      { k: "Construction", v: "Structured 5-panel, stitched brim, brass six-point closure." },
      { k: "Materials", v: "100% cotton shell + sweatband, solid brass hardware." },
    ],
    price: "₴845",
    sizeLabel: "ONE SIZE",
    cta: "COP THE CAP",
    limitedRun: "LIMITED RUN",
  },

  gallery: {
    chapterNum: "03",
    title: "GALLERY",
    items: [
      { alt: "Subway station entrance, urban photography", cap: "SUBWAY / 6TH AVE" },
      { alt: "Concrete stairs, low angle urban shot", cap: "STAIRS / NO. 12" },
      { alt: "Parking garage, concrete texture", cap: "GARAGE / LEVEL 3" },
      { alt: "Skateboarder in motion, urban street", cap: "SKATE / SESSION 2" },
      { alt: "Rooftop skyline at golden hour", cap: "ROOFTOP / DUSK" },
      { alt: "Freedom Inside cap worn on bench, golden hour, real drop photo", cap: "REAL DROP / GOLDEN HOUR" },
    ],
    dragHint: "drag to scroll →",
    countHint: "06 photographs / issue no.001",
  },

  craft: {
    chapterNum: "05",
    title: "CRAFT",
    items: [
      {
        alt: "Macro texture of raw cotton twill fabric",
        title: "THE CLOTH",
        text: "Raw cotton twill, chosen for weight before color. Softens with wear, never pills.",
      },
      {
        alt: "Macro of embroidery thread stitching detail",
        title: "THE THREAD",
        text: "Hand-guided embroidery, tonal thread — the emblem reads by shadow, not shine.",
      },
      {
        alt: "Interior label and production detail of a cap",
        title: "THE LABEL",
        text: "Numbered by hand, sewn into the sweatband — proof of the run it came from.",
      },
    ],
  },

  shop: {
    chapterNum: "04",
    title: "SHOP",
    items: [
      {
        alt: "Corner 5-panel cap, natural colorway",
        status: "IN STOCK",
        name: "CORNER — NATURAL",
        cta: "ORDER NOW",
        variant: "natural",
      },
      {
        alt: "Corner 5-panel cap, charcoal colorway, worn on body, real photo",
        status: "IN STOCK",
        name: "CORNER — CHARCOAL",
        cta: "ORDER NOW",
        variant: "charcoal",
      },
    ],
    price: "₴ 845",
  },

  footer: {
    tagline: "An independent streetwear label out of Kyiv, made in small runs, on things worth keeping.",
    ctaLines: ["FREEDOM LOOKS", "DIFFERENT ON", "EVERYONE."],
    shopHeading: "SHOP",
    shopLinks: [
      { label: "The First Drop", href: "#drop" },
      { label: "All Colorways", href: "#shop" },
      { label: "Order Now", href: "/order" },
    ],
    infoHeading: "INFO",
    infoLinks: [
      { label: "Manifesto", href: "#manifesto" },
      { label: "Craft", href: "#craft" },
      { label: "Contact", href: "#" },
    ],
    followHeading: "FOLLOW",
    followLinks: [
      { label: "Instagram", href: "#" },
      { label: "Telegram", href: "#" },
      { label: "Contact", href: "#" },
    ],
    bottomLeft: "© 2026 FREEDOM INSIDE, KYIV",
    bottomRight: "ONE CAP. MADE PROPERLY.",
  },

  order: {
    back: "← BACK TO THE SITE",
    kicker: "DROP NO. 001",
    titleLine1: "ORDER THE",
    titleLine2: "CORNER 5-PANEL.",
    sub: "Pick a colorway, drop your details, and we'll confirm sizing and shipping directly — no cart, no checkout maze, just a message straight to us.",
    colorwayLabel: "Colorway",
    variants: [
      { id: "natural", label: "CORNER — NATURAL", status: "In stock" },
      { id: "charcoal", label: "CORNER — CHARCOAL", status: "In stock" },
    ],
    quantityLabel: "Quantity",
    nameLabel: "Name",
    phoneLabel: "Phone",
    cityLabel: "City",
    npLabel: "Nova Poshta branch",
    commentLabel: "Comment (optional)",
    submit: "SEND ORDER",
    submitting: "SENDING…",
    loading: "Loading form…",
    success: {
      stamp: "ORDER SENT",
      title: ["GOT IT.", "WE'LL BE IN TOUCH."],
      text: "Your order just landed in our inbox. We'll reach out on the number you gave us to confirm sizing, shipping and payment — usually within a day.",
      back: "BACK TO THE SITE",
    },
    errors: {
      generic: "Something went wrong. Try again.",
      network: "Couldn't reach the server. Check your connection and try again.",
    },
  },
};

export default dict;
