import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OrderForm from "@/components/OrderForm";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = await getDictionary(params.locale as Locale);
  return { title: `${dict.order.titleLine1} ${dict.order.titleLine2} — FREEDOM INSIDE` };
}

export default async function OrderPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Header locale={locale} dict={dict} switchPath="/order" />
      <section className="order-hero chapter">
        <Suspense fallback={<p className="order-loading">{dict.order.loading}</p>}>
          <OrderForm dict={dict.order} locale={locale} />
        </Suspense>
      </section>
      <Footer locale={locale} dict={dict} switchPath="/order" />
    </>
  );
}