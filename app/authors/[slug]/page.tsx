import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { buildMetadata } from "@/lib/seo/metadata";
import { WebPageJsonLd } from "@/lib/seo/jsonLd";

type Params = { slug: string };

const AUTHORS: Record<string, { name: string; role: string; bio: string }> = {
  editorial: {
    name: "CheckBillsOnline Editorial",
    role: "Editorial team",
    bio:
      "Our editorial team is a small group of writers and researchers focused on utility-sector regulation, tariffs, and consumer rights across South Asia, the Middle East, Africa, and the Anglosphere. Every page on the site is reviewed and dated by a member of the team.",
  },
};

export async function generateStaticParams(): Promise<Params[]> {
  return Object.keys(AUTHORS).map((slug) => ({ slug }));
}

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await props.params;
  const a = AUTHORS[slug];
  if (!a) return {};
  return buildMetadata({
    path: `/authors/${slug}`,
    title: `${a.name} — author profile`,
    description: a.bio,
  });
}

export default async function AuthorPage(props: { params: Promise<Params> }) {
  const { slug } = await props.params;
  const a = AUTHORS[slug];
  if (!a) notFound();
  const breadcrumb = [
    { name: "Home", href: "/" },
    { name: "Authors", href: "/authors/editorial" },
    { name: a.name, href: `/authors/${slug}` },
  ];
  return (
    <>
      <WebPageJsonLd url={`/authors/${slug}`} name={a.name} description={a.bio} breadcrumb={breadcrumb} />
      <div className="container-wide pt-6"><Breadcrumb items={breadcrumb} /></div>
      <article className="container-tight py-12 prose-cb">
        <h1>{a.name}</h1>
        <p className="text-sm uppercase tracking-wide text-brand-700">{a.role}</p>
        <p>{a.bio}</p>
      </article>
    </>
  );
}
