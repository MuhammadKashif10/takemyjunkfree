/**
 * Blog / guides. CMS-ready: maps to a Payload "Posts" collection with rich text body.
 */

export type PostSection = { heading: string; paragraphs: string[]; bullets?: string[] };

export type Post = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: "Guides" | "Free Collection" | "Moving in Dubai" | "Sustainability";
  readingMinutes: number;
  publishedISO: string;
  sections: PostSection[];
};

export const posts: Post[] = [
  {
    slug: "what-makes-an-item-qualify-for-free-collection",
    title: "What actually makes an item qualify for free collection?",
    metaTitle: "What Qualifies for Free Junk Collection in Dubai?",
    metaDescription:
      "An honest breakdown of how reusable furniture, appliances and homeware qualify for free collection in Dubai — and why some items are always a paid removal.",
    excerpt:
      "Condition, completeness, demand and access decide it — not the price you originally paid. Here is how the assessment actually works.",
    category: "Free Collection",
    readingMinutes: 5,
    publishedISO: "2026-06-18",
    sections: [
      {
        heading: "Free collection is about reuse value, not generosity",
        paragraphs: [
          "A collection can only be free when the item still has value to someone else. If a piece can go straight into another home or office and be used as-is, the reuse value covers the cost of collecting it. If it cannot, the job becomes labour, transport and disposal — and those cost money.",
          "That is the whole model. It is not a discount and it is not a loss-leader, which is why the assessment has to be honest on both sides.",
        ],
      },
      {
        heading: "The four things we look at",
        paragraphs: ["Every photo assessment comes down to the same four questions."],
        bullets: [
          "Condition: is it clean, structurally sound and free of odours, mould or heavy damage?",
          "Completeness: are the shelves, cushions, legs, remotes and fixings still there?",
          "Demand: does this category move in Dubai right now, or does it sit?",
          "Access: can it be carried out safely without being cut apart?",
        ],
      },
      {
        heading: "Categories that usually qualify",
        paragraphs: [
          "Sofas without tears or stains, solid wood dining sets, wardrobes and dressers, working fridges and washing machines, televisions that power on, and quality office furniture are the most consistent qualifiers.",
        ],
      },
      {
        heading: "Categories that almost never qualify",
        paragraphs: [
          "Used mattresses are the clearest example: hygiene standards mean they are not passed on, so they are always a paid removal. Flat-pack furniture that has already been assembled once, water-damaged wood, rusted appliances and anything with a persistent odour fall into the same group.",
        ],
      },
      {
        heading: "Mixed loads are normal",
        paragraphs: [
          "Most homes have both. The practical approach is to photograph everything, let the qualifying pieces be collected free, and get a written quote for the rest. You are never obliged to accept the paid portion.",
        ],
      },
    ],
  },
  {
    slug: "how-to-photograph-items-for-an-accurate-quote",
    title: "How to photograph your items for an accurate quote",
    metaTitle: "How to Photograph Junk for an Accurate Dubai Quote",
    metaDescription:
      "Five practical photo tips that get you a faster, more accurate junk removal quote in Dubai — and avoid surprises on collection day.",
    excerpt:
      "A quote is only as good as the photos behind it. Five minutes of careful photography prevents almost every on-the-day surprise.",
    category: "Guides",
    readingMinutes: 4,
    publishedISO: "2026-06-30",
    sections: [
      {
        heading: "Why photos beat descriptions",
        paragraphs: [
          "Descriptions compress. 'A few boxes and an old sofa' can mean two very different jobs. Photos remove that ambiguity and let us price volume, weight and access before anyone travels.",
        ],
      },
      {
        heading: "Shoot the whole item, then the flaws",
        paragraphs: [
          "Start with one photo of the complete piece from a step or two back, then add close-ups of any tears, chips, rust or missing parts. Showing damage up front speeds up the assessment — it never counts against you.",
        ],
      },
      {
        heading: "Include the room, not just the object",
        paragraphs: [
          "A wide shot tells us how the item will come out: doorway width, corridor turns, whether a wardrobe needs dismantling. This is the single most useful photo you can send.",
        ],
      },
      {
        heading: "Photograph the route out",
        paragraphs: [
          "One picture of the stairwell or lift, and one of where a vehicle can stop, lets us plan the team size correctly. In high-rise buildings, tell us whether the service lift needs a booking.",
        ],
      },
      {
        heading: "Group small items together",
        paragraphs: [
          "For boxes, bags and loose clutter, stack them in one place and take a single photo with something for scale. Volume is easier to judge from one pile than from twelve separate shots.",
        ],
      },
    ],
  },
  {
    slug: "end-of-tenancy-clearance-checklist-dubai",
    title: "End-of-tenancy clearance checklist for Dubai renters",
    metaTitle: "End of Tenancy Clearance Checklist | Dubai Renters Guide",
    metaDescription:
      "A practical checklist for clearing a Dubai apartment or villa before handover, including lift bookings, timing and what to remove first.",
    excerpt:
      "Handover inspections are unforgiving. This checklist covers the sequence that keeps a Dubai move-out on schedule.",
    category: "Moving in Dubai",
    readingMinutes: 6,
    publishedISO: "2026-07-12",
    sections: [
      {
        heading: "Four weeks out: decide what leaves the country with you",
        paragraphs: [
          "Separate your belongings into three piles: shipping, selling or giving away, and disposal. The middle pile is where free collection helps most, because good furniture rarely justifies shipping costs.",
        ],
      },
      {
        heading: "Three weeks out: book the building, not just the movers",
        paragraphs: [
          "In most Dubai towers the service lift is the bottleneck, not the truck. Ask building management for the booking process early, and confirm whether weekends are permitted at all.",
        ],
      },
      {
        heading: "Two weeks out: send your clearance photos",
        paragraphs: [
          "Get your removal quote locked in before the final week. Month-end is the busiest window in Dubai and slots close quickly, particularly on Thursdays and Fridays.",
        ],
      },
      {
        heading: "One week out: empty the hidden storage",
        paragraphs: [
          "Storerooms, maid's rooms, balcony cupboards and the top of wardrobes account for most of the volume people forget. Clear them before the movers arrive, not after.",
        ],
        bullets: [
          "Storeroom and utility cupboards",
          "Balcony and terrace storage",
          "Garage or basement storage cages",
          "Anything left behind by a previous tenant",
        ],
      },
      {
        heading: "Handover day: leave time for the sweep",
        paragraphs: [
          "Inspections check corners, not centres. Once furniture is out, the floor space needs a proper sweep — our team does this as standard on clearance jobs so the property is ready to inspect.",
        ],
      },
    ],
  },
  {
    slug: "why-mattresses-are-never-free-to-remove",
    title: "Why mattresses are never free to remove",
    metaTitle: "Why Mattress Removal Is Never Free in Dubai",
    metaDescription:
      "Mattresses are always a paid removal in Dubai. Here is the hygiene and handling reality behind that, and how mattress disposal is priced.",
    excerpt:
      "It is the question we get most often. The answer is short: used mattresses are not passed on, so there is no reuse value to offset the work.",
    category: "Free Collection",
    readingMinutes: 3,
    publishedISO: "2026-07-25",
    sections: [
      {
        heading: "No reuse value means no free collection",
        paragraphs: [
          "Free collection works because reusable items can be passed on. Used mattresses are not resold or rehomed for hygiene reasons, regardless of brand, age or how carefully they were looked after. With no reuse value, the entire cost of removal falls on labour, transport and disposal.",
        ],
      },
      {
        heading: "Handling is genuinely difficult",
        paragraphs: [
          "A king mattress is bulky rather than heavy, which makes stairwells and lift corners the hard part. Many buildings insist mattresses travel through the service lift only, and some require them wrapped before they leave the apartment.",
        ],
      },
      {
        heading: "What that means for your quote",
        paragraphs: [
          "Mattress disposal is priced per item, with the floor level and lift availability factored in. The bed frame is assessed separately — a solid frame in good condition may well qualify for free collection even when the mattress does not.",
        ],
      },
    ],
  },
  {
    slug: "reducing-landfill-waste-when-you-move-in-dubai",
    title: "Reducing landfill waste when you move home in Dubai",
    metaTitle: "Reduce Landfill Waste When Moving Home in Dubai",
    metaDescription:
      "Practical ways to cut the amount of furniture and household waste going to landfill during a Dubai move, with a reuse-first approach.",
    excerpt:
      "Dubai's transient population moves a lot of furniture. A reuse-first sequence keeps far more of it out of landfill.",
    category: "Sustainability",
    readingMinutes: 5,
    publishedISO: "2026-08-04",
    sections: [
      {
        heading: "Sort before you book anything",
        paragraphs: [
          "The biggest environmental win happens before a vehicle is booked. Separating genuinely reusable items from waste at the start means the reusable pile never enters a disposal stream in the first place.",
        ],
      },
      {
        heading: "Repairable is not the same as broken",
        paragraphs: [
          "A wobbly chair leg or a missing shelf pin often makes people write off a piece entirely. Small, cheap fixes can move an item from the disposal pile into the reuse pile — it is worth checking before you decide.",
        ],
      },
      {
        heading: "Keep sets together",
        paragraphs: [
          "Matched dining sets, bedroom suites and modular sofas hold far more reuse value complete than split up. If you are clearing in stages, tell us so we can keep sets together.",
        ],
      },
      {
        heading: "Deal with packaging separately",
        paragraphs: [
          "Moving generates enormous cardboard volume. Flatten it, stack it in one place and keep it out of your furniture load — it is faster to handle and easier to route responsibly.",
        ],
        bullets: [
          "Flatten every box rather than nesting them",
          "Keep plastic wrap separate from cardboard",
          "Break down foam and polystyrene last, it is the bulkiest",
        ],
      },
      {
        heading: "Ask where things go",
        paragraphs: [
          "Any removal company should be able to tell you plainly what happens to your items after collection. If the answer is vague, ask again.",
        ],
      },
    ],
  },
  {
    slug: "villa-garden-clearance-guide-dubai",
    title: "A practical guide to villa garden clearances in Dubai",
    metaTitle: "Villa Garden Clearance Guide | Dubai Green Waste",
    metaDescription:
      "How garden waste clearance works for Dubai villas: what counts as green waste, why weight drives pricing, and how to prepare the site.",
    excerpt:
      "Garden loads are heavier than they look. Here is how to prepare a villa garden clearance so the job runs in one visit.",
    category: "Guides",
    readingMinutes: 4,
    publishedISO: "2026-08-09",
    sections: [
      {
        heading: "Weight, not volume, drives the price",
        paragraphs: [
          "Bagged soil, sand, gravel and freshly cut palm fronds are dense. A garden load that looks half the size of a furniture load can weigh several times more, which is why garden waste is quoted differently.",
        ],
      },
      {
        heading: "What counts as garden waste",
        paragraphs: ["Most villa gardens produce a predictable mix."],
        bullets: [
          "Palm fronds, hedge trimmings and grass cuttings",
          "Bagged soil, sand and gravel from landscaping",
          "Broken pots, planters and garden ornaments",
          "Old artificial grass, decking offcuts and shade sails",
          "Damaged outdoor furniture and parasols",
        ],
      },
      {
        heading: "Prepare the access route",
        paragraphs: [
          "Clear a path from the garden to the driveway before the team arrives, and unlock any side gates. In gated communities, register the vehicle with security in advance so the visit is not held at the gate.",
        ],
      },
      {
        heading: "Book early in summer",
        paragraphs: [
          "Between June and September, outdoor work is scheduled early in the morning for safety. Those slots fill first, so book with a few days of margin.",
        ],
      },
      {
        heading: "Do not forget the outdoor furniture",
        paragraphs: [
          "Garden sofas, dining sets and sun loungers in serviceable condition are assessed for free collection just like indoor pieces. Photograph them separately from the green waste.",
        ],
      },
    ],
  },
];

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);
