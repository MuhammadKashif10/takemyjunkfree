"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { quoteFormSchema, type QuoteFormValues } from "@/lib/quote-schema";
import { trackEvent } from "@/lib/analytics";

/**
 * Lead capture form. Submits to /api/quote (validates, honeypot-checks,
 * uploads photos, writes a quote-requests row) and only redirects to
 * /quote/thank-you once that write actually succeeds.
 */
export function QuoteForm({
  areas,
  services,
  whatsappHref,
  defaultService,
  defaultArea,
}: {
  areas: { slug: string; name: string }[];
  services: { slug: string; shortTitle: string }[];
  whatsappHref?: string | undefined;
  defaultService?: string | undefined;
  defaultArea?: string | undefined;
}) {
  const router = useRouter();
  const photosRef = useRef<HTMLInputElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      area: defaultArea ?? "",
      service: defaultService ?? "",
      consent: false as unknown as true,
    },
  });

  async function onSubmit(values: QuoteFormValues) {
    setSubmitError(null);

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("phone", values.phone);
    formData.append("email", values.email ?? "");
    formData.append("area", values.area ?? "");
    formData.append("service", values.service ?? "");
    formData.append("items", values.items);
    formData.append("consent", String(values.consent));
    formData.append("company", honeypotRef.current?.value ?? "");

    for (const file of photosRef.current?.files ?? []) {
      formData.append("photos", file);
    }

    const response = await fetch("/api/quote", { method: "POST", body: formData });
    const json = (await response.json().catch(() => null)) as { ok: boolean; error?: string } | null;

    if (!response.ok || !json?.ok) {
      const message = json?.error ?? "Something went wrong. Please try again or WhatsApp us directly.";
      setSubmitError(message);
      toast.error("Couldn't send your request", { description: message });
      return;
    }

    trackEvent("quote_submitted", { service: values.service, area: values.area });
    reset();
    if (photosRef.current) photosRef.current.value = "";
    router.push("/quote/thank-you");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Honeypot: off-screen, unlabeled, never seen by real visitors. */}
      <input
        ref={honeypotRef}
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Your name</Label>
          <Input id="name" autoComplete="name" placeholder="Full name" {...register("name")} />
          {errors.name ? <p className="text-xs text-destructive">{errors.name.message}</p> : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Mobile / WhatsApp</Label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+971 5X XXX XXXX"
            {...register("phone")}
          />
          {errors.phone ? <p className="text-xs text-destructive">{errors.phone.message}</p> : null}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Email (optional)</Label>
          <Input id="email" type="email" autoComplete="email" placeholder="you@email.com" {...register("email")} />
          {errors.email ? <p className="text-xs text-destructive">{errors.email.message}</p> : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="area">Area in Dubai</Label>
          <select
            id="area"
            className="h-10 w-full rounded-lg border border-input bg-card px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            defaultValue={defaultArea ?? ""}
            {...register("area")}
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
          defaultValue={defaultService ?? ""}
          className="h-10 w-full rounded-lg border border-input bg-card px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          {...register("service")}
        >
          <option value="" disabled>
            Select a service
          </option>
          {services.map((service) => (
            <option key={service.slug} value={service.slug}>
              {service.shortTitle}
            </option>
          ))}
          <option value="not-sure">I&apos;m not sure yet</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="items">Describe your items</Label>
        <Textarea
          id="items"
          rows={5}
          placeholder="e.g. 3-seater sofa in good condition, a working fridge, two mattresses and some boxes. 2nd floor, lift available."
          {...register("items")}
        />
        <p className="text-xs text-muted-foreground">
          Mention the floor, lift access and whether anything needs dismantling.
        </p>
        {errors.items ? <p className="text-xs text-destructive">{errors.items.message}</p> : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="photos">Photos</Label>
        <Input id="photos" ref={photosRef} type="file" accept="image/*" multiple className="cursor-pointer" />
        <p className="text-xs text-muted-foreground">
          Up to 6 photos, 8MB each. You can also send them straight to WhatsApp.
        </p>
      </div>

      <div className="flex items-start gap-3 rounded-xl bg-secondary p-4">
        <Controller
          name="consent"
          control={control}
          render={({ field }) => (
            <Checkbox
              id="consent"
              className="mt-0.5"
              checked={field.value === true}
              onCheckedChange={(checked) => field.onChange(checked === true)}
            />
          )}
        />
        <Label htmlFor="consent" className="text-sm font-normal leading-relaxed text-muted-foreground">
          I&apos;m happy to be contacted about this request by phone, WhatsApp or email, and I&apos;ve
          read the{" "}
          <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline">
            privacy policy
          </a>
          .
        </Label>
      </div>
      {errors.consent ? <p className="text-xs text-destructive">{errors.consent.message}</p> : null}

      {submitError ? <p className="text-sm text-destructive">{submitError}</p> : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="submit" size="lg" disabled={isSubmitting} className="sm:flex-1">
          {isSubmitting ? "Sending…" : "Request my quote"}
        </Button>
        {whatsappHref ? (
          <Button asChild variant="whatsapp" size="lg" className="sm:flex-1">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { placement: "quote_form" })}
            >
              <MessageCircle /> Send photos on WhatsApp
            </a>
          </Button>
        ) : null}
      </div>
    </form>
  );
}
