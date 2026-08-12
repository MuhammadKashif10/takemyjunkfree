import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, MessageCircle, Phone, Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Container } from "@/components/site/Section";
import { primaryNav, site } from "@/content/site";

function Wordmark() {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
      <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <Recycle className="size-5" aria-hidden />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-sm font-bold tracking-tight text-foreground">
          Take My Junk Dubai
        </span>
        <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
          Free collection service
        </span>
      </span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-20">
        <Wordmark />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{ className: "text-primary bg-secondary" }}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-smooth hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="whatsapp" size="sm" className="hidden sm:inline-flex">
            <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer">
              <MessageCircle /> WhatsApp
            </a>
          </Button>
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link to="/quote">Get a quote</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86vw] max-w-sm bg-background p-0">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex h-full flex-col">
                <div className="border-b border-border px-5 py-4">
                  <Wordmark />
                </div>
                <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
                  {primaryNav.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      activeProps={{ className: "text-primary bg-secondary" }}
                      className="block rounded-lg px-3 py-3 text-base font-medium text-foreground transition-smooth hover:bg-secondary"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    to="/faqs"
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-base font-medium text-foreground transition-smooth hover:bg-secondary"
                  >
                    FAQs
                  </Link>
                </nav>
                <div className="space-y-2 border-t border-border p-4">
                  <Button asChild variant="whatsapp" size="lg" className="w-full">
                    <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer">
                      <MessageCircle /> WhatsApp us
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full">
                    <a href={site.phoneHref}>
                      <Phone /> {site.phone}
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
