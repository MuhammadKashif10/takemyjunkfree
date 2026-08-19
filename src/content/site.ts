/**
 * Central site configuration.
 * CMS-ready: every value here maps 1:1 to a future Payload CMS "Site Settings" global.
 * Placeholders are intentional until real business details are supplied.
 */

export const site = {
  name: "Take My Junk Dubai Free",
  shortName: "Take My Junk Dubai",
  domain: "takemyjunkdubaifree.com",
  tagline: "Free collection for reusable items. Fair, upfront pricing for everything else.",
  description:
    "Dubai junk removal and free collection service. Qualifying reusable furniture, appliances and luxury items collected free — general junk, clearances and disposal handled as a paid service.",
  phone: "[PHONE NUMBER]",
  phoneHref: "tel:[PHONE NUMBER]",
  whatsapp: "[WHATSAPP NUMBER]",
  whatsappHref: "https://wa.me/[WHATSAPP NUMBER]",
  email: "[EMAIL ADDRESS]",
  address: {
    line1: "[BUSINESS ADDRESS]",
    district: "Arabian Ranches 2",
    city: "Dubai",
    country: "United Arab Emirates",
  },
  hours: "[OPENING HOURS]",
} as const;

export type NavItem = { label: string; to: string };

export const primaryNav: NavItem[] = [
  { label: "Free Collection", to: "/free-collection" },
  { label: "Services", to: "/services" },
  { label: "What We Take", to: "/what-we-take" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "Areas", to: "/areas" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Services",
    items: [
      { label: "Free Item Collection", to: "/free-collection" },
      { label: "All Services", to: "/services" },
      { label: "Get a Quote", to: "/quote" },
      { label: "What We Take", to: "/what-we-take" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "How It Works", to: "/how-it-works" },
      { label: "Service Areas", to: "/areas" },
      { label: "FAQs", to: "/faqs" },
      { label: "Contact", to: "/contact" },
    ],
  },
];
