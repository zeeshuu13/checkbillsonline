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
    path: `/${c.slug}/electricity-bill-check`,
    title: `${c.name} Electricity Bill Check — All Providers Online`,
    description: `Check your ${c.name} electricity bill online. Full provider list with tariff slabs, payment methods, and complaint contacts.`,
    keywords: [
      `${c.name} electricity bill check`,
      `${c.name} electricity bill online`,
      `pay electricity bill in ${c.name}`,
    ],
  });
}

export default async function Page(props: { params: Promise<Params> }) {
  const { country } = await props.params;
  return <UtilityHubPage countrySlug={country} type="electricity" />;
}
