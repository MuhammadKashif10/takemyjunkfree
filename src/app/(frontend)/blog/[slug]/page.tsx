import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { Container, Section } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CtaBand } from "@/components/site/CtaBand";
import { JsonLd } from "@/components/site/JsonLd";
import { getAllPosts, getPostBySlug } from "@/lib/payload-data";
import { articleNode, breadcrumbNode, buildMetadata, schemaGraph } from "@/lib/seo";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article unavailable", robots: { index: false, follow: false } };

  return buildMetadata({
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    path: `/blog/${slug}`,
    image: post.heroImageUrl,
  });
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([getPostBySlug(slug), getAllPosts()]);
  if (!post) notFound();

  const more = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const graph = schemaGraph([
    breadcrumbNode(`/blog/${slug}`, [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${slug}` },
    ]),
    articleNode({
      path: `/blog/${slug}`,
      headline: post.title,
      description: post.excerpt,
      image: post.heroImageUrl,
      authorName: post.authorName ?? "Editorial team",
      datePublished: post.publishedDate,
      dateModified: post.updatedDate,
    }),
  ]);

  return (
    <>
      <div className="bg-hero-gradient py-12 sm:py-16">
        <Container>
          <Breadcrumbs onDark items={[{ label: "Blog", to: "/blog" }, { label: post.category ?? "Guide" }]} />
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            {post.category} {post.readingMinutes ? `· ${post.readingMinutes} min read` : null}
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold text-primary-foreground sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-primary-foreground/80">{post.excerpt}</p>
        </Container>
      </div>

      <Section>
        <article
          className="max-w-3xl [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:first:mt-0 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-foreground [&_p]:mt-4 [&_p]:leading-relaxed [&_p]:text-muted-foreground [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_li]:text-muted-foreground"
        >
          <RichText data={post.body as never} />
        </article>

        {more.length > 0 ? (
          <div className="mt-6 border-t border-border pt-8">
            <h2 className="text-xl font-bold text-foreground">More guides</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {more.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="rounded-2xl border border-border bg-card p-5 shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-lift"
                >
                  <h3 className="font-bold text-foreground">{p.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{p.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </Section>

      <CtaBand />

      <JsonLd data={graph} />
    </>
  );
}
