/**
 * Service catalogue. CMS-ready: each entry maps to a Payload "Services" collection document.
 */

export type PricingModel = "free-if-qualifying" | "paid" | "mixed";

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  pricing: PricingModel;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  includes: string[];
  goodToKnow: string[];
  typicalJobs: string[];
  relatedSlugs: string[];
};

export const services: Service[] = [
  {
    slug: "free-item-collection",
    title: "Free Item Collection in Dubai",
    shortTitle: "Free Item Collection",
    pricing: "free-if-qualifying",
    summary:
      "Reusable furniture, working appliances and quality branded pieces can qualify for collection at no cost to you.",
    metaTitle: "Free Item Collection Dubai | Reusable Furniture & Appliances",
    metaDescription:
      "Send photos of your reusable furniture, appliances or branded pieces. If the items qualify, we collect them from your Dubai address free of charge.",
    intro: [
      "Not everything you no longer need is junk. If an item is clean, complete and still usable by someone else, it has resale or reuse value — and that value is what makes free collection possible.",
      "You send photos through WhatsApp, we confirm which pieces qualify, and we book a collection slot. There is no charge for qualifying items, and no obligation if we can only take part of the load.",
    ],
    includes: [
      "Photo assessment over WhatsApp before anyone travels",
      "A written confirmation of which items qualify as free",
      "Collection from apartments, villas and offices across Dubai",
      "Careful handling so items stay resaleable",
    ],
    goodToKnow: [
      "Qualification depends on condition, demand and access — not on the original price you paid.",
      "Mixed loads are common. Qualifying items stay free; the rest is quoted separately before we start.",
      "Building access permissions, lift bookings and permits are the property owner's responsibility.",
    ],
    typicalJobs: [
      "A three-seater sofa in good condition from a Marina apartment",
      "A working fridge and washing machine after an upgrade",
      "Solid wood dining sets from a villa handover",
    ],
    relatedSlugs: ["furniture-removal", "appliance-removal", "house-clearance"],
  },
  {
    slug: "junk-removal",
    title: "General Junk Removal in Dubai",
    shortTitle: "Junk Removal",
    pricing: "paid",
    summary:
      "Mixed household and office junk cleared, loaded and taken away in one visit — priced on volume and access.",
    metaTitle: "Junk Removal Dubai | Same-Visit Loading & Disposal",
    metaDescription:
      "Dubai junk removal for mixed household and office waste. Photo-based quotes, no hidden charges, and loading handled by our team.",
    intro: [
      "General junk is anything that has reached the end of its useful life: broken flat-pack furniture, damaged storage, packaging, worn-out household goods and the contents of a storeroom nobody has opened in two years.",
      "This work is a paid service because it costs time, labour and disposal fees. We quote from photos so the number you hear is the number you pay.",
    ],
    includes: [
      "Loading from inside the property — you do not carry anything",
      "Stairs, lifts and long carries factored into the quote",
      "Sorting of anything reusable out of the load where possible",
      "Sweep-up of the cleared area before we leave",
    ],
    goodToKnow: [
      "Quotes are based on volume, weight and access difficulty.",
      "Hazardous materials, chemicals and medical waste are outside our scope.",
      "Community and building rules may restrict working hours — we plan around them.",
    ],
    typicalJobs: [
      "A storeroom clear-out before a move",
      "Post-renovation leftovers and packaging",
      "Broken office furniture from a small fit-out",
    ],
    relatedSlugs: ["property-clearance", "furniture-removal", "garden-waste-removal"],
  },
  {
    slug: "furniture-removal",
    title: "Unwanted Furniture Removal in Dubai",
    shortTitle: "Furniture Removal",
    pricing: "mixed",
    summary:
      "Sofas, wardrobes, beds and dining sets removed — free when reusable, quoted fairly when they are not.",
    metaTitle: "Unwanted Furniture Removal Dubai | Free If Reusable",
    metaDescription:
      "Furniture removal across Dubai. Reusable pieces may qualify for free collection; damaged or flat-pack furniture is removed as a paid service.",
    intro: [
      "Furniture is the clearest example of our two-track model. A clean, structurally sound sofa is worth something to another household. A water-damaged particleboard wardrobe is not.",
      "Send photos of each piece and we will tell you honestly which side of the line it falls on before we quote anything.",
    ],
    includes: [
      "Dismantling of beds, wardrobes and bulky units where needed",
      "Protection of doorways and lift interiors during the carry",
      "Separate treatment of qualifying and non-qualifying pieces",
      "Removal of packaging and fixings left behind",
    ],
    goodToKnow: [
      "Flat-pack furniture rarely survives a second assembly, so it is usually a paid removal.",
      "Upholstery with stains, odours or pet damage does not qualify as free.",
      "Very large pieces may need a lift booking with your building management.",
    ],
    typicalJobs: [
      "Replacing a bedroom set and clearing the old one",
      "Removing a corner sofa that will not fit a new layout",
      "Emptying a study of desks and shelving units",
    ],
    relatedSlugs: ["free-item-collection", "mattress-disposal", "junk-removal"],
  },
  {
    slug: "appliance-removal",
    title: "Appliance Removal and Collection in Dubai",
    shortTitle: "Appliance Removal",
    pricing: "mixed",
    summary:
      "Fridges, washers, ovens and ACs collected — working units may qualify free, faulty units are removed for a fee.",
    metaTitle: "Appliance Removal Dubai | Fridges, Washers & Ovens",
    metaDescription:
      "Appliance collection across Dubai. Working, clean appliances can qualify for free pickup; faulty or scrap units are removed as a paid service.",
    intro: [
      "Large appliances are heavy, awkward and often need two people and a trolley. We handle the lift, the stairs and the doorway measurements so nothing gets damaged on the way out.",
      "A working appliance that has been kept clean is genuinely useful to someone else, which is why it can qualify for free collection.",
    ],
    includes: [
      "Two-person handling for heavy units",
      "Disconnection of unplumbed, already-isolated appliances",
      "Trolley and floor protection on tiled and marble floors",
      "Responsible routing of scrap metal units",
    ],
    goodToKnow: [
      "Plumbing and electrical disconnection by a licensed technician may be required first.",
      "Units with heavy rust, mould or missing parts are treated as paid removals.",
      "Split AC units usually require a specialist and are quoted case by case.",
    ],
    typicalJobs: [
      "Swapping a fridge and clearing the old one the same week",
      "Removing a faulty washing machine from a first-floor apartment",
      "Clearing a kitchen of appliances before a renovation",
    ],
    relatedSlugs: ["free-item-collection", "junk-removal", "property-clearance"],
  },
  {
    slug: "mattress-disposal",
    title: "Mattress and Bed Disposal in Dubai",
    shortTitle: "Mattress Disposal",
    pricing: "paid",
    summary:
      "Mattresses, bed bases and headboards removed from any floor, with careful handling through corridors and lifts.",
    metaTitle: "Mattress Disposal Dubai | Beds, Bases & Headboards",
    metaDescription:
      "Mattress and bed disposal in Dubai. We remove mattresses, bases and headboards from apartments and villas as a straightforward paid service.",
    intro: [
      "Used mattresses are almost always a paid removal. Hygiene standards mean they are not resold, so the job is labour and disposal from start to finish.",
      "Pricing is per item and confirmed before the visit, including any stair carries.",
    ],
    includes: [
      "Bagging or wrapping before the carry where corridors require it",
      "Removal of bed frames, slats and headboards in the same visit",
      "Access planning for tight stairwells and service lifts",
      "Clear per-item pricing agreed in advance",
    ],
    goodToKnow: [
      "Mattresses are not collected free, regardless of brand or age.",
      "Bed frames in good condition may qualify separately for free collection.",
      "Some buildings require mattresses to move through the service lift only.",
    ],
    typicalJobs: [
      "Two king mattresses after a bedroom refresh",
      "Bunk beds and mattresses from a family villa",
      "Mattress and base removal during a tenancy handover",
    ],
    relatedSlugs: ["furniture-removal", "junk-removal", "house-clearance"],
  },
  {
    slug: "house-clearance",
    title: "House and Apartment Clearance in Dubai",
    shortTitle: "House Clearance",
    pricing: "paid",
    summary:
      "Full or partial clearance of villas and apartments, coordinated around handover dates and building rules.",
    metaTitle: "House Clearance Dubai | Villa & Apartment Clear-Outs",
    metaDescription:
      "House and apartment clearance across Dubai. Room-by-room clear-outs planned around handover dates, lift bookings and community access rules.",
    intro: [
      "Clearances are planned jobs, not spontaneous ones. We walk through the property list with you first — usually over WhatsApp photos or a short video — and agree exactly what stays and what goes.",
      "Anything resaleable is separated out, which reduces disposal volume and can reduce your cost.",
    ],
    includes: [
      "Room-by-room plan agreed before the day",
      "Separation of reusable items from genuine waste",
      "Coordination with building management for lifts and parking",
      "Final sweep so the property is ready to inspect",
    ],
    goodToKnow: [
      "Handover deadlines fill up fast at month-end; book early where you can.",
      "Documents, valuables and personal effects are your responsibility to remove first.",
      "Large clearances may run across two visits to fit access windows.",
    ],
    typicalJobs: [
      "End-of-tenancy clearance before a villa handover",
      "Clearing a relative's apartment after relocation",
      "Partial clearance of storerooms and maid's rooms",
    ],
    relatedSlugs: ["property-clearance", "junk-removal", "furniture-removal"],
  },
  {
    slug: "property-clearance",
    title: "Office and Property Clearance in Dubai",
    shortTitle: "Property Clearance",
    pricing: "paid",
    summary:
      "Offices, retail units, warehouses and shared spaces cleared with scheduling that respects your operating hours.",
    metaTitle: "Office & Property Clearance Dubai | Commercial Clear-Outs",
    metaDescription:
      "Commercial property clearance in Dubai for offices, retail units and warehouses. Scheduled around your operating hours with reusable stock separated out.",
    intro: [
      "Commercial clearances need paperwork, timing and predictability. We work to a fixed scope agreed in writing, so facilities teams and landlords know exactly what will happen.",
      "Desks, task chairs and storage in serviceable condition are frequently reusable and are separated before disposal.",
    ],
    includes: [
      "Site scope agreed in writing before the booking",
      "Out-of-hours and weekend slots where the building allows",
      "Separation of reusable office furniture and equipment",
      "Coordination with facilities management and security",
    ],
    goodToKnow: [
      "Access passes and loading-bay bookings need arranging with your building.",
      "IT equipment holding data should be wiped or removed by your own team first.",
      "Fit-out debris and construction waste are quoted separately from furniture.",
    ],
    typicalJobs: [
      "Clearing a small office after a lease ends",
      "Removing shelving and displays from a retail unit",
      "Emptying a storage unit of surplus stock and fittings",
    ],
    relatedSlugs: ["house-clearance", "junk-removal", "appliance-removal"],
  },
  {
    slug: "garden-waste-removal",
    title: "Garden Waste and Outdoor Clearance in Dubai",
    shortTitle: "Garden Waste Removal",
    pricing: "paid",
    summary:
      "Green waste, palm fronds, old outdoor furniture and landscaping leftovers cleared from villa gardens and terraces.",
    metaTitle: "Garden Waste Removal Dubai | Green Waste & Outdoor Junk",
    metaDescription:
      "Garden waste removal in Dubai. Palm fronds, hedge trimmings, soil bags, broken outdoor furniture and landscaping debris cleared from villas and terraces.",
    intro: [
      "Garden clearances are heavier than they look. Soil, sand bags, pots and cut palm fronds add weight quickly, so quotes are based on volume and load weight together.",
      "We work around villa community rules on vehicle access and working hours.",
    ],
    includes: [
      "Loading of green waste, trimmings and bagged soil",
      "Removal of broken outdoor furniture, pots and planters",
      "Clearance of old artificial grass, decking offcuts and shade sails",
      "Tidy-up of the working area once loaded",
    ],
    goodToKnow: [
      "Weight matters more than volume for soil, sand and stone.",
      "Outdoor furniture in usable condition may qualify for free collection.",
      "Summer jobs are usually scheduled early morning for safety.",
    ],
    typicalJobs: [
      "Post-landscaping debris in a Ranches villa garden",
      "Palm frond and hedge trimming clearance",
      "Removing a damaged garden sofa set and parasol",
    ],
    relatedSlugs: ["junk-removal", "furniture-removal", "house-clearance"],
  },
  {
    slug: "luxury-item-collection",
    title: "Luxury and Designer Item Collection in Dubai",
    shortTitle: "Luxury Item Collection",
    pricing: "free-if-qualifying",
    summary:
      "Designer furniture, quality lighting, art and premium homeware assessed for free collection based on condition and demand.",
    metaTitle: "Luxury & Designer Item Collection Dubai | Free Assessment",
    metaDescription:
      "Designer furniture, premium lighting, art and quality homeware assessed for free collection in Dubai. Send photos for an honest condition review.",
    intro: [
      "Premium pieces are assessed individually. Brand alone does not decide it — condition, completeness and current demand do.",
      "We tell you plainly whether a piece qualifies for free collection, and we never inflate expectations to win a booking.",
    ],
    includes: [
      "Individual photo assessment of each piece",
      "Blanket wrapping and careful loading",
      "Collection of matched sets kept together",
      "Honest feedback when a piece does not qualify",
    ],
    goodToKnow: [
      "We do not provide valuations, appraisals or resale guarantees.",
      "Original documentation, if you have it, helps the assessment.",
      "Damaged or heavily worn premium items may still be a paid removal.",
    ],
    typicalJobs: [
      "A designer dining set from a Downtown apartment",
      "Statement lighting removed during a re-style",
      "Quality office furniture from a home study",
    ],
    relatedSlugs: ["free-item-collection", "furniture-removal", "house-clearance"],
  },
  {
    slug: "same-day-collection",
    title: "Same-Day and Urgent Collection in Dubai",
    shortTitle: "Same-Day Collection",
    pricing: "mixed",
    summary:
      "Short-notice slots for handovers, move-out deadlines and last-minute clear-outs, subject to team availability.",
    metaTitle: "Same-Day Junk Collection Dubai | Urgent Clear-Outs",
    metaDescription:
      "Urgent and same-day junk collection in Dubai, subject to availability. Send photos for a fast quote and a confirmed arrival window.",
    intro: [
      "Move-out days rarely go to plan. When you need something gone before a handover inspection, send photos as early in the day as you can and we will tell you honestly whether a slot exists.",
      "We would rather decline than promise a window we cannot hold.",
    ],
    includes: [
      "Fast photo-based quoting over WhatsApp",
      "A confirmed arrival window, not a vague promise",
      "Priority handling for handover and inspection deadlines",
      "Free-item assessment still applies to qualifying pieces",
    ],
    goodToKnow: [
      "Same-day slots depend entirely on team availability that day.",
      "Building access and lift bookings can be the limiting factor, not us.",
      "Urgent scheduling may affect the quote for paid work.",
    ],
    typicalJobs: [
      "Clearing a apartment hours before a handover inspection",
      "Removing furniture left behind by outgoing tenants",
      "Last-minute office desk removal before a lease ends",
    ],
    relatedSlugs: ["house-clearance", "junk-removal", "free-item-collection"],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
