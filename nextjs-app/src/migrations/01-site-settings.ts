import { footerNav, primaryNav, site } from "../content/site";
import { freeCriteria, notAccepted } from "../content/items";
import { getMigrationPayload } from "./lib/payload-client";

export async function importSiteSettings() {
  const payload = await getMigrationPayload();

  await payload.updateGlobal({
    slug: "site-settings",
    data: {
      name: site.name,
      shortName: site.shortName,
      tagline: site.tagline,
      description: site.description,
      phone: site.phone,
      phoneHref: site.phoneHref,
      whatsapp: site.whatsapp,
      whatsappHref: site.whatsappHref,
      email: site.email,
      address: {
        line1: site.address.line1,
        district: site.address.district,
        city: site.address.city,
        country: site.address.country,
      },
      hours: site.hours,
      whatWeTake: {
        notAccepted: notAccepted.map((item) => ({ item })),
        freeCriteria: freeCriteria.map((c) => ({ title: c.title, body: c.body })),
      },
    },
  });

  await payload.updateGlobal({
    slug: "navigation",
    data: {
      primaryNav: primaryNav.map((n) => ({ label: n.label, href: n.to })),
      footerNav: footerNav.map((group) => ({
        title: group.title,
        items: group.items.map((n) => ({ label: n.label, href: n.to })),
      })),
    },
  });

  payload.logger.info("Site settings + navigation imported.");
}
