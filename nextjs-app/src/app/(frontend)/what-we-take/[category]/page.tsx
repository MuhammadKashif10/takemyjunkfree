import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { Container, Section } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CtaBand } from "@/components/site/CtaBand";
import { JsonLd } from "@/components/site/JsonLd";
import { getItemCategories, getItemCategoryBySlug } from "@/lib/payload-data";
import { breadcrumbNode, buildMetadata, schemaGraph } from "@/lib/seo";

export async function generateStaticParams() {
  const categories = await getItemCategories();
  return categories.map((c) => ({ category: c.slug }));
}

type Params = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await getItemCategoryBySlug(slug);
  if (!category) return { title: "Category unavailable", robots: { index: false, follow: false } };

  return buildMetadata({
    title: `${category.title} | What We Take in Dubai`,
    description: category.note || `${category.title} — ${category.track === "free" ? "free if qualifying" : "paid removal"} in Dubai.`,
    path: `/what-we-take/${slug}`,
  });
}

export default async function ItemCategoryPage({ params }: Params) {
  const { category: slug } = await params;
  const category = await getItemCategoryBySlug(slug);
  if (!category) notFound();

  const graph = schemaGraph([
    breadcrumbNode(`/what-we-take/${slug}`, [
      { name: "Home", path: "/" },
      { name: "What We Take", path: "/what-we-take" },
      { name: category.title, path: `/what-we-take/${slug}` },
    ]),
  ]);

  return (
    <>
      <div className="bg-hero-gradient py-12 sm:py-16">
        <Container>
          <Breadcrumbs onDark items={[{ label: "What We Take", to: "/what-we-take" }, { label: category.title }]} />
          <span
            className={`mt-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
              category.track === "free" ? "bg-free-soft text-free" : "bg-paid-soft text-paid"
            }`}
          >
            {category.track === "free" ? (
              <CheckCircle2 className="size-3.5" aria-hidden />
            ) : (
              <XCircle className="size-3.5" aria-hidden />
            )}
            {category.track === "free" ? "Can be free" : "Paid service"}
          </span>
          <h1 className="mt-4 max-w-2xl text-4xl font-extrabold text-primary-foreground sm:text-5xl">
            {category.title}
          </h1>
          {category.note ? <p className="mt-5 max-w-2xl text-lg text-primary-foreground/80">{category.note}</p> : null}
        </Container>
      </div>

      <Section>
        <div className="max-w-2xl">
          <h2 className="text-xl font-bold text-foreground">What&apos;s included</h2>
          <ul className="mt-5 space-y-2.5 text-sm text-foreground">
            {category.items.map((item) => (
              <li key={item} className="flex gap-2.5">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                {item}
              </li>
            ))}
          </ul>

          {category.relatedService ? (
            <Link
              href={`/services/${category.relatedService.slug}`}
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              See the {category.relatedService.shortTitle} service <ArrowRight className="size-4" aria-hidden />
            </Link>
          ) : null}
        </div>
      </Section>

      <CtaBand />

      <JsonLd data={graph} />
    </>
  );
}
