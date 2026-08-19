/**
 * "What we take" catalogue. CMS-ready: maps to a Payload "Item Categories" collection.
 */

export type ItemGroup = {
  slug: string;
  title: string;
  track: "free" | "paid";
  note: string;
  items: string[];
};

export const itemGroups: ItemGroup[] = [
  {
    slug: "living-room-furniture",
    title: "Living & bedroom furniture",
    track: "free",
    note: "Clean, structurally sound and complete pieces someone else can use immediately.",
    items: [
      "Sofas and armchairs without stains or tears",
      "Solid wood dining tables and chairs",
      "Wardrobes, dressers and chests of drawers",
      "Bed frames, headboards and bedside tables",
      "Bookcases, sideboards and TV units",
    ],
  },
  {
    slug: "working-appliances",
    title: "Working appliances",
    track: "free",
    note: "Tested, clean and complete with their doors, shelves and trays.",
    items: [
      "Fridges and freezers in working order",
      "Washing machines and dryers",
      "Ovens, hobs and microwaves",
      "Dishwashers and water dispensers",
      "Small kitchen appliances in original condition",
    ],
  },
  {
    slug: "premium-pieces",
    title: "Luxury & designer pieces",
    track: "free",
    note: "Assessed individually on condition, completeness and demand.",
    items: [
      "Designer seating and dining furniture",
      "Statement lighting and floor lamps",
      "Framed art, mirrors and decorative pieces",
      "Quality rugs without damage or odour",
      "Premium home-office furniture",
    ],
  },
  {
    slug: "electronics-and-office",
    title: "Electronics & office equipment",
    track: "free",
    note: "Working units with cables and accessories included where possible.",
    items: [
      "Televisions and monitors that power on",
      "Task chairs and desks in serviceable condition",
      "Filing cabinets and storage units",
      "Audio equipment and speakers",
      "Exercise equipment in usable condition",
    ],
  },
  {
    slug: "general-junk",
    title: "General household junk",
    track: "paid",
    note: "Removed and disposed of responsibly — priced on volume and access.",
    items: [
      "Broken or flat-pack furniture",
      "Storeroom and maid's-room contents",
      "Packaging, boxes and moving materials",
      "Worn-out household goods and clutter",
      "Damaged toys, luggage and sports gear",
    ],
  },
  {
    slug: "mattresses",
    title: "Mattresses & bedding",
    track: "paid",
    note: "Not resold for hygiene reasons, so always a paid removal.",
    items: [
      "Single, double and king mattresses",
      "Mattress toppers and protectors",
      "Divan and slatted bases",
      "Damaged headboards",
      "Used pillows and duvets",
    ],
  },
  {
    slug: "garden-waste",
    title: "Garden & outdoor waste",
    track: "paid",
    note: "Weight-led pricing because soil, sand and stone add up fast.",
    items: [
      "Palm fronds, hedge trimmings and green waste",
      "Bagged soil, sand and gravel",
      "Broken outdoor furniture and parasols",
      "Old artificial grass and decking offcuts",
      "Cracked pots, planters and garden ornaments",
    ],
  },
  {
    slug: "renovation-leftovers",
    title: "Renovation & fit-out leftovers",
    track: "paid",
    note: "Non-hazardous construction leftovers only, quoted after photos.",
    items: [
      "Removed cabinetry and worktops",
      "Old doors, skirting and timber offcuts",
      "Packaging and protective sheeting",
      "Surplus tiles and boarding",
      "Stripped-out shelving and fittings",
    ],
  },
];

export const notAccepted: string[] = [
  "Chemicals, solvents, paint and fuels",
  "Medical, clinical or biological waste",
  "Asbestos and any hazardous building material",
  "Gas cylinders and pressurised containers",
  "Car batteries and loose motor oils",
  "Anything requiring a specialist licensed disposal permit",
];

export const freeCriteria: { title: string; body: string }[] = [
  {
    title: "It is genuinely reusable",
    body: "The item works, is complete and could go straight into another home or office without repair.",
  },
  {
    title: "It is clean and undamaged",
    body: "No deep stains, strong odours, mould, heavy rust or structural damage. Normal light wear is fine.",
  },
  {
    title: "There is demand for it",
    body: "Some categories move quickly in Dubai and some do not. Demand is part of the honest assessment.",
  },
  {
    title: "We can move it safely",
    body: "Access matters. Extremely heavy pieces, or items that must be cut apart to leave the property, may not qualify.",
  },
];
