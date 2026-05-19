import type { Metadata } from "next";
import { COUNTRIES, getCountry } from "@/lib/data/countries";
import { UtilityHubPage } from "@/components/UtilityHubPage";
import { buildMetadata } from "@/lib/seo/metadata";

type Params = { country: string };

export async function generateStaticParams(): Promise<Params[]> {
  return COUNTRIES.map((c) => ({ country: c.slug }));
}

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const { country } = await props.params;
  const c = getCountry(country);
  if (!c) return {};
  return buildMetadata({
    path: `/${c.slug}/gas-bill-check`,
    title: `${c.name} Gas Bill Check — All Providers Online`,
    description: `Check your ${c.name} gas bill online. Provider list with tariff guidance, payment methods, and complaint contacts.`,
    keywords: [
      `${c.name} gas bill check`,
      `${c.name} gas bill online`,
      `pay gas bill in ${c.name}`,
    ],
  });
}

export default async function Page(props: { params: Promise<Params> }) {
  const { country } = await props.params;
  return <UtilityHubPage countrySlug={country} type="gas" />;
}
