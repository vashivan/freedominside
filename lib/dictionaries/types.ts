export type Dictionary = {
  nav: {
    manifesto: string;
    drop: string;
    gallery: string;
    craft: string;
    shop: string;
    order: string;
  };
  issueTag: string;

  hero: {
    l1: string;
    l2: string;
    l3: string;
    sticker: string[];
    photoAlt: string;
    tagline: string;
    marker: string;
    scrollTag: string;
  };

  manifesto: {
    chapterNum: string;
    title: string;
    lede: string[];
    photoAlt: string;
    cols: { num: string; title: string; text: string }[];
  };

  film: {
    photoAlt: string;
    title: string;
    play: string;
    playing: string;
    shotIn: string;
    filmTag: string;
  };

  drop: {
    chapterNum: string;
    title: string;
    kicker: string;
    productAlt: string;
    name: string;
    desc: string;
    specs: { k: string; v: string }[];
    price: string;
    sizeLabel: string;
    cta: string;
    limitedRun: string;
  };

  gallery: {
    chapterNum: string;
    title: string;
    items: { alt: string; cap: string }[];
    dragHint: string;
    countHint: string;
  };

  craft: {
    chapterNum: string;
    title: string;
    items: { alt: string; title: string; text: string }[];
  };

  shop: {
    chapterNum: string;
    title: string;
    items: { alt: string; status: string; name: string; cta: string; variant: string }[];
    price: string;
  };

  footer: {
    tagline: string;
    ctaLines: string[];
    shopHeading: string;
    shopLinks: { label: string; href: string }[];
    infoHeading: string;
    infoLinks: { label: string; href: string }[];
    followHeading: string;
    followLinks: { label: string; href: string }[];
    bottomLeft: string;
    bottomRight: string;
  };

  order: {
    back: string;
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    sub: string;
    colorwayLabel: string;
    variants: { id: string; label: string; status: string }[];
    quantityLabel: string;
    nameLabel: string;
    phoneLabel: string;
    cityLabel: string;
    npLabel: string;
    commentLabel: string;
    submit: string;
    submitting: string;
    loading: string;
    success: { stamp: string; title: string[]; text: string; back: string };
    errors: { generic: string; network: string };
  };
};
