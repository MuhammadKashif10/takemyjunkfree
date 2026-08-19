import { NextResponse } from "next/server";

import { getPayloadClient } from "@/lib/payload-data";
import { MAX_PHOTOS, MAX_PHOTO_BYTES, quoteFormSchema } from "@/lib/quote-schema";

export const runtime = "nodejs";

/**
 * Real submission endpoint — replaces the old console.log-only form.
 * Never returns ok:true unless a quote-requests row was actually written.
 *
 * Honeypot: a hidden "company" field. Genuine visitors never fill it (it's
 * off-screen and unlabeled); if it's non-empty we return the same success
 * response a real submission would get — so a bot can't learn the field is
 * being checked — but skip writing anything. That's a deliberate exception
 * to "never claim success without a write": it's aimed at deceiving bots,
 * not visitors.
 */
export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid form submission." }, { status: 400 });
  }

  const honeypot = String(formData.get("company") ?? "").trim();
  if (honeypot.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const parsed = quoteFormSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    area: formData.get("area") || undefined,
    service: formData.get("service") || undefined,
    items: formData.get("items"),
    consent: formData.get("consent") === "true",
  });

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the form for errors.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const photoFiles = formData
    .getAll("photos")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  if (photoFiles.length > MAX_PHOTOS) {
    return NextResponse.json(
      { ok: false, error: `Please attach at most ${MAX_PHOTOS} photos.` },
      { status: 400 },
    );
  }
  for (const file of photoFiles) {
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ ok: false, error: "Only image files can be attached." }, { status: 400 });
    }
    if (file.size > MAX_PHOTO_BYTES) {
      return NextResponse.json({ ok: false, error: "Each photo must be under 8MB." }, { status: 400 });
    }
  }

  const data = parsed.data;

  try {
    const payload = await getPayloadClient();

    const [areaMatch, serviceMatch] = await Promise.all([
      data.area
        ? payload.find({ collection: "areas", where: { name: { equals: data.area } }, limit: 1, depth: 0 })
        : null,
      data.service
        ? payload.find({ collection: "services", where: { slug: { equals: data.service } }, limit: 1, depth: 0 })
        : null,
    ]);

    const photoIds: (string | number)[] = [];
    for (const file of photoFiles) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const media = await payload.create({
        collection: "media",
        data: { alt: `Quote request photo: ${data.name}`, isPrivate: true },
        file: {
          data: buffer,
          mimetype: file.type,
          name: file.name,
          size: file.size,
        },
      });
      photoIds.push(media.id);
    }

    await payload.create({
      collection: "quote-requests",
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email || undefined,
        area: areaMatch?.docs[0]?.["id"] as string | number | undefined,
        service: serviceMatch?.docs[0]?.["id"] as string | number | undefined,
        items: data.items,
        photos: photoIds,
        consent: data.consent,
        status: "new",
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("quote-request submission failed", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong on our end. Please try again or WhatsApp us directly." },
      { status: 500 },
    );
  }
}
