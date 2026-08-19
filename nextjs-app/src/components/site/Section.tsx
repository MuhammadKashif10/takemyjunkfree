import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8", className)}>{children}</div>;
}

export function Section({
  children,
  className,
  tone = "default",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "sand" | "dark" | "card";
  id?: string;
}) {
  const tones = {
    default: "bg-background",
    sand: "bg-sand-gradient",
    dark: "bg-hero-gradient text-primary-foreground",
    card: "bg-card",
  } as const;

  return (
    <section id={id} className={cn("py-14 sm:py-20", tones[tone], className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, onDark }: { children: ReactNode; onDark?: boolean | undefined }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]",
        onDark
          ? "bg-primary-foreground/12 text-primary-foreground"
          : "bg-secondary text-secondary-foreground",
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  onDark,
  align = "left",
  as: As = "h2",
}: {
  eyebrow?: string | undefined;
  title: string;
  description?: string | undefined;
  onDark?: boolean | undefined;
  align?: "left" | "center" | undefined;
  as?: "h1" | "h2" | "h3" | undefined;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow> : null}
      <As
        className={cn(
          "mt-4 text-3xl font-bold sm:text-4xl",
          onDark ? "text-primary-foreground" : "text-foreground",
        )}
      >
        {title}
      </As>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            onDark ? "text-primary-foreground/80" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
