import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Container, Section } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CtaBand } from "@/components/site/CtaBand";
import { postBySlug, posts, type Post } from "@/content/blog";
import { site } from "@/content/site";
import { buildHead, breadcrumbSchema, jsonLd } from "@/lib/seo";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = postBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const post = loaderData.post as Post;
    return {
      ...buildHead({
        title: post.metaTitle,
        description: post.metaDescription,
        path: `/blog/${params.slug}`,
        type: "article",
      }),
      scripts: [
        breadcrumbSchema([
          { name: "Home", item: "/" },
          { name: "Blog", item: "/blog" },
          { name: post.title, item: `/blog/${params.slug}` },
        ]),
        jsonLd({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.metaDescription,
          datePublished: post.publishedISO,
          author: { "@type": "Organization", name: site.name },
        }),
      ],
    };
  },
  component: BlogPost,
});

function BlogPost() {
  const { post } = Route.useLoaderData() as { post: Post };
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <div className="bg-hero-gradient py-12 sm:py-16">
        <Container>
          <Breadcrumbs onDark items={[{ label: "Blog", to: "/blog" }, { label: post.category }]} />
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            {post.category} · {post.readingMinutes} min read
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold text-primary-foreground sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-primary-foreground/80">{post.excerpt}</p>
        </Container>
      </div>

      <Section>
        <article className="max-w-3xl">
          {post.sections.map((section) => (
            <div key={section.heading} className="mb-10">
              <h2 className="text-2xl font-bold text-foreground">{section.heading}</h2>
              {section.paragraphs.map((para) => (
                <p key={para.slice(0, 24)} className="mt-4 leading-relaxed text-muted-foreground">
                  {para}
                </p>
              ))}
              {section.bullets ? (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
                  {section.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </article>

        <div className="mt-6 border-t border-border pt-8">
          <h2 className="text-xl font-bold text-foreground">More guides</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {more.map((p) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="rounded-2xl border border-border bg-card p-5 shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-lift"
              >
                <h3 className="font-bold text-foreground">{p.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
