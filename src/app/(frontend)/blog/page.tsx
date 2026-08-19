import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section, SectionHeading } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CtaBand } from "@/components/site/CtaBand";
import { JsonLd } from "@/components/site/JsonLd";
import { getAllPosts } from "@/lib/payload-data";
import { breadcrumbNode, buildMetadata, itemListNode, schemaGraph } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Dubai Junk Removal Blog | Clear-Out Guides & Advice",
    description:
      "Practical guides on clearing out in Dubai: what qualifies for free collection, photographing items for a quote, end-of-tenancy checklists and reducing waste.",
    path: "/blog",
  });
}

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  const graph = schemaGraph([
    breadcrumbNode("/blog", [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
    ]),
    itemListNode(
      "/blog",
      posts.map((p) => ({ name: p.title, path: `/blog/${p.slug}` })),
    ),
  ]);

  return (
    <>
      <div className="bg-hero-gradient py-12 sm:py-16">
        <Container>
          <Breadcrumbs onDark items={[{ label: "Blog" }]} />
          <SectionHeading
            as="h1"
            onDark
            eyebrow="Guides"
            title="Clear-out guides for Dubai homes and offices"
            description="Written from the jobs we actually do — no filler, no recycled advice."
          />
        </Container>
      </div>

      <Section>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                {post.category}
              </span>
              <h2 className="mt-3 text-lg font-bold text-foreground">{post.title}</h2>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
              {post.readingMinutes ? (
                <span className="mt-4 text-xs text-muted-foreground">{post.readingMinutes} min read</span>
              ) : null}
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand />

      <JsonLd data={graph} />
    </>
  );
}
