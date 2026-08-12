import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { services } from "@/content/services";
import { areas } from "@/content/areas";
import { site } from "@/content/site";
import { MessageCircle } from "lucide-react";

/**
 * Lead capture form.
 * CMS/backend-ready: the payload shape below maps directly to a future
 * Payload CMS "Quote Requests" collection. No backend is wired yet.
 */
export function QuoteForm({ defaultService }: { defaultService?: string | undefined }) {
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    const data = new FormData(event.currentTarget);
    const payload = Object.fromEntries(data.entries());
    // eslint-disable-next-line no-console
    console.info("quote-request", payload);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Request received", {
        description: "For the fastest reply, send your photos on WhatsApp as well.",
      });
      event.currentTarget?.reset?.();
    }, 400);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Your name</Label>
          <Input id="name" name="name" required autoComplete="name" placeholder="Full name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Mobile / WhatsApp</Label>
          <Input
            id="phone"
            name="phone"
            required
            type="tel"
            autoComplete="tel"
            placeholder="+971 5X XXX XXXX"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Email (optional)</Label>
          <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@email.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="area">Area in Dubai</Label>
          <select
            id="area"
            name="area"
            className="h-10 w-full rounded-lg border border-input bg-card px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            defaultValue=""
          >
            <option value="" disabled>
              Select your area
            </option>
            {areas.map((area) => (
              <option key={area.slug} value={area.name}>
                {area.name}
              </option>
            ))}
            <option value="Other">Other / not listed</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="service">What do you need?</Label>
        <select
          id="service"
          name="service"
          defaultValue={defaultService ?? ""}
          className="h-10 w-full rounded-lg border border-input bg-card px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="" disabled>
            Select a service
          </option>
          {services.map((service) => (
            <option key={service.slug} value={service.slug}>
              {service.shortTitle}
            </option>
          ))}
          <option value="not-sure">I'm not sure yet</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="items">Describe your items</Label>
        <Textarea
          id="items"
          name="items"
          rows={5}
          required
          placeholder="e.g. 3-seater sofa in good condition, a working fridge, two mattresses and some boxes. 2nd floor, lift available."
        />
        <p className="text-xs text-muted-foreground">
          Mention the floor, lift access and whether anything needs dismantling.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="photos">Photos</Label>
        <Input id="photos" name="photos" type="file" accept="image/*" multiple className="cursor-pointer" />
        <p className="text-xs text-muted-foreground">
          Photos are the fastest route to an accurate answer. You can also send them straight to
          WhatsApp.
        </p>
      </div>

      <div className="flex items-start gap-3 rounded-xl bg-secondary p-4">
        <Checkbox id="consent" name="consent" required className="mt-0.5" />
        <Label htmlFor="consent" className="text-sm font-normal leading-relaxed text-muted-foreground">
          I'm happy to be contacted about this request by phone, WhatsApp or email.
        </Label>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="submit" size="lg" disabled={submitting} className="sm:flex-1">
          {submitting ? "Sending…" : "Request my quote"}
        </Button>
        <Button asChild variant="whatsapp" size="lg" className="sm:flex-1">
          <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer">
            <MessageCircle /> Send photos on WhatsApp
          </a>
        </Button>
      </div>
    </form>
  );
}
