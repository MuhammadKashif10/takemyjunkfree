/**
 * Dubai service areas. CMS-ready: maps to a Payload "Service Areas" collection.
 * Each entry carries location-specific content so no two pages read the same.
 */

export type AreaType = "apartment" | "villa" | "mixed" | "commercial";

export type Area = {
  slug: string;
  name: string;
  region: "Central Dubai" | "New Dubai" | "Old Dubai" | "Dubailand & South" | "Coastal & Islands";
  type: AreaType;
  landmarks: string;
  intro: string;
  housing: string;
  access: string;
  commonJobs: string[];
  popularServices: string[];
};

export const areas: Area[] = [
  {
    slug: "arabian-ranches-2",
    name: "Arabian Ranches 2",
    region: "Dubailand & South",
    type: "villa",
    landmarks: "Sheikh Mohammed Bin Zayed Road, Dubai Polo & Equestrian Club",
    intro:
      "Arabian Ranches 2 is our home community, so collections here are usually the easiest to schedule. Family villas turn over furniture regularly as children grow and layouts change, which makes it one of the strongest areas for qualifying free items.",
    housing: "Three to six bedroom family villas with private gardens, garages and generous storerooms.",
    access:
      "Driveway parking makes loading straightforward, though community security requires vehicle details at the gate. Garden clearances here are common and are weight-priced.",
    commonJobs: [
      "Garden waste and landscaping debris after villa upgrades",
      "Children's furniture and bunk beds replaced as families grow",
      "Storeroom and garage clear-outs before summer travel",
    ],
    popularServices: ["free-item-collection", "garden-waste-removal", "house-clearance"],
  },
  {
    slug: "arabian-ranches",
    name: "Arabian Ranches",
    region: "Dubailand & South",
    type: "villa",
    landmarks: "Arabian Ranches Golf Club, Ranches Souk",
    intro:
      "One of Dubai's established villa communities, Arabian Ranches has long-term residents whose original furniture is often still in excellent condition. Well-kept solid wood pieces from here frequently qualify for free collection.",
    housing: "Mature villas with landscaped gardens, many refurbished by second or third owners.",
    access:
      "Wide internal roads and driveway access. Renovation-driven clearances are common, so we often split loads between reusable pieces and fit-out leftovers.",
    commonJobs: [
      "Post-renovation furniture and cabinetry removal",
      "Mature garden clearances and palm frond loads",
      "Complete villa clearances at handover",
    ],
    popularServices: ["house-clearance", "garden-waste-removal", "furniture-removal"],
  },
  {
    slug: "dubai-marina",
    name: "Dubai Marina",
    region: "New Dubai",
    type: "apartment",
    landmarks: "Marina Walk, Dubai Marina Mall, JBR tram line",
    intro:
      "Dubai Marina has one of the highest tenant turnover rates in the city, which means constant move-in and move-out collections. Furniture here is often only a year or two old and in very good condition.",
    housing: "High-rise apartments, mostly one and two bedroom, many furnished or part-furnished.",
    access:
      "Service lift bookings are essential and most towers require advance notice through building management. Loading bays are shared, so we plan tight arrival windows.",
    commonJobs: [
      "End-of-tenancy apartment clearances",
      "Sofa and bed removal on lease changeover",
      "Appliance swaps in serviced apartments",
    ],
    popularServices: ["free-item-collection", "house-clearance", "same-day-collection"],
  },
  {
    slug: "jumeirah-beach-residence",
    name: "Jumeirah Beach Residence (JBR)",
    region: "Coastal & Islands",
    type: "apartment",
    landmarks: "The Beach at JBR, The Walk",
    intro:
      "JBR apartments cycle through short and medium-term tenants, and furniture packages are replaced often. Lightly used seating and dining sets from JBR are strong candidates for free collection.",
    housing: "Beachfront towers with a high share of furnished rentals and holiday-home units.",
    access:
      "Restricted loading zones and busy podium parking mean early morning slots work best. Service lift booking is mandatory in most towers.",
    commonJobs: [
      "Furnished apartment refresh clear-outs",
      "Mattress and bed base disposal between tenancies",
      "Removal of worn outdoor terrace furniture",
    ],
    popularServices: ["free-item-collection", "mattress-disposal", "same-day-collection"],
  },
  {
    slug: "downtown-dubai",
    name: "Downtown Dubai",
    region: "Central Dubai",
    type: "mixed",
    landmarks: "Burj Khalifa, Dubai Mall, Dubai Opera",
    intro:
      "Downtown apartments are frequently restyled rather than emptied, so we see a high proportion of premium individual pieces rather than whole-home clearances. Designer furniture and statement lighting from here often qualifies for free collection.",
    housing: "Premium high-rise apartments and a growing cluster of small offices and studios.",
    access:
      "Tight timing windows, valet-managed entrances and strict lift protocols. We coordinate directly with concierge teams.",
    commonJobs: [
      "Single designer pieces removed during a restyle",
      "Home-office furniture changes",
      "Appliance replacement in high-floor apartments",
    ],
    popularServices: ["luxury-item-collection", "free-item-collection", "furniture-removal"],
  },
  {
    slug: "business-bay",
    name: "Business Bay",
    region: "Central Dubai",
    type: "mixed",
    landmarks: "Dubai Water Canal, Bay Avenue",
    intro:
      "Business Bay mixes residential towers with a dense concentration of small offices, so a single day here can include an apartment sofa collection and an office desk clearance a block apart.",
    housing: "Apartment towers alongside commercial floors and co-working conversions.",
    access:
      "Loading bays are shared with commercial tenants and are busiest mid-morning. Weekend slots are usually smoother for office work.",
    commonJobs: [
      "Small office fit-out and desk clearances",
      "Apartment furniture removal at lease end",
      "Storage room clear-outs in commercial units",
    ],
    popularServices: ["property-clearance", "junk-removal", "furniture-removal"],
  },
  {
    slug: "jumeirah-lake-towers",
    name: "Jumeirah Lake Towers (JLT)",
    region: "New Dubai",
    type: "mixed",
    landmarks: "JLT lakes, DMCC metro station",
    intro:
      "JLT's cluster layout means each tower has its own management rules, so we confirm lift and parking arrangements per building rather than per area. Office and apartment work here is split roughly evenly.",
    housing: "Mid-to-high-rise towers with mixed residential and small-business occupancy.",
    access:
      "Basement parking heights limit larger vehicles in some clusters, which we check before booking.",
    commonJobs: [
      "Office chair and desk clearances from small firms",
      "Apartment appliance and furniture swaps",
      "Storage unit clear-outs in the basements",
    ],
    popularServices: ["property-clearance", "free-item-collection", "junk-removal"],
  },
  {
    slug: "palm-jumeirah",
    name: "Palm Jumeirah",
    region: "Coastal & Islands",
    type: "mixed",
    landmarks: "The Pointe, Atlantis, Golden Mile",
    intro:
      "Palm Jumeirah properties range from shoreline apartments to signature villas, and furniture standards here are high. Premium pieces from the Palm are assessed individually for free collection.",
    housing: "Beachfront villas, garden homes and shoreline apartment buildings.",
    access:
      "Trunk and frond access requires planning, and several buildings restrict service vehicle hours. Villa driveways make loading easy once inside.",
    commonJobs: [
      "Designer furniture removed during interior updates",
      "Outdoor and pool furniture clearance",
      "Full villa clearances between tenancies",
    ],
    popularServices: ["luxury-item-collection", "house-clearance", "garden-waste-removal"],
  },
  {
    slug: "jumeirah",
    name: "Jumeirah",
    region: "Coastal & Islands",
    type: "villa",
    landmarks: "Jumeirah Beach Road, Mercato, Jumeirah Mosque",
    intro:
      "Jumeirah's older independent villas often hold decades of accumulated contents, which makes clearances here larger and more layered than a typical apartment job. Solid furniture from these homes is frequently reusable.",
    housing: "Independent and compound villas, many long-held by the same families.",
    access:
      "Street parking on Jumeirah's side roads can be narrow; we schedule outside school run hours where possible.",
    commonJobs: [
      "Multi-room villa clearances",
      "Garage and majlis storage clear-outs",
      "Older appliance removal and replacement",
    ],
    popularServices: ["house-clearance", "furniture-removal", "appliance-removal"],
  },
  {
    slug: "umm-suqeim",
    name: "Umm Suqeim",
    region: "Coastal & Islands",
    type: "villa",
    landmarks: "Kite Beach, Burj Al Arab, Umm Suqeim Park",
    intro:
      "Umm Suqeim sees steady renovation activity as older villas are rebuilt or extended. That produces a mix of genuinely reusable furniture and heavy fit-out leftovers in the same job.",
    housing: "Established beachside villas, many undergoing renovation or extension.",
    access: "Good driveway access; renovation loads need weight-based quoting rather than volume alone.",
    commonJobs: [
      "Renovation strip-out leftovers",
      "Garden and outdoor furniture clearance",
      "Kitchen appliance removal before refits",
    ],
    popularServices: ["junk-removal", "garden-waste-removal", "appliance-removal"],
  },
  {
    slug: "al-barsha",
    name: "Al Barsha",
    region: "Central Dubai",
    type: "mixed",
    landmarks: "Mall of the Emirates, Al Barsha Pond Park",
    intro:
      "Al Barsha combines low-rise apartment buildings, shared villas and small commercial units, so job sizes vary widely. Shared accommodation turnover makes bed and mattress removal especially common here.",
    housing: "Mid-rise apartments, villa compounds and mixed-use commercial buildings.",
    access:
      "Many buildings have no dedicated loading bay, so kerbside loading windows are agreed in advance.",
    commonJobs: [
      "Mattress and bunk bed disposal from shared accommodation",
      "Apartment clearances at lease end",
      "Small retail and office unit clear-outs",
    ],
    popularServices: ["mattress-disposal", "junk-removal", "house-clearance"],
  },
  {
    slug: "the-springs",
    name: "The Springs",
    region: "New Dubai",
    type: "villa",
    landmarks: "The Springs Souk, Emirates Living lakes",
    intro:
      "The Springs is a long-established family community with compact villas and small gardens. Space is tight, so residents clear out regularly and free-qualifying furniture appears often.",
    housing: "Two and three bedroom townhouse-style villas with modest private gardens.",
    access: "Narrow internal lanes; a single vehicle at a time works best outside peak school hours.",
    commonJobs: [
      "Garage and understairs storage clear-outs",
      "Small garden waste loads",
      "Bedroom furniture replacement",
    ],
    popularServices: ["free-item-collection", "garden-waste-removal", "furniture-removal"],
  },
  {
    slug: "the-meadows",
    name: "The Meadows",
    region: "New Dubai",
    type: "villa",
    landmarks: "Emirates Hills border, Meadows Village",
    intro:
      "Meadows villas are larger than neighbouring Springs homes and hold more furniture per clearance. Renovation cycles here regularly release quality pieces that qualify for free collection.",
    housing: "Four to five bedroom lakeside villas with mature landscaping.",
    access: "Generous driveways and easy vehicle access; community gate registration required.",
    commonJobs: [
      "Full villa clearances between tenancies",
      "Mature garden and tree trimming waste",
      "Study and home-office furniture removal",
    ],
    popularServices: ["house-clearance", "free-item-collection", "garden-waste-removal"],
  },
  {
    slug: "emirates-hills",
    name: "Emirates Hills",
    region: "New Dubai",
    type: "villa",
    landmarks: "Montgomerie Golf Club, Emirates Hills lakes",
    intro:
      "Emirates Hills properties are large, privately owned and often extensively furnished. Collections here are typically scheduled, discreet and focused on premium individual pieces.",
    housing: "Large custom-built mansions on private plots.",
    access: "Strict community access control; visits are pre-registered with security and household staff.",
    commonJobs: [
      "Designer furniture removal during redecoration",
      "Large garden and landscaping clearances",
      "Staff quarters and storeroom clear-outs",
    ],
    popularServices: ["luxury-item-collection", "house-clearance", "garden-waste-removal"],
  },
  {
    slug: "jumeirah-village-circle",
    name: "Jumeirah Village Circle (JVC)",
    region: "New Dubai",
    type: "mixed",
    landmarks: "Circle Mall, JVC district parks",
    intro:
      "JVC has one of the fastest handover rates in Dubai, with new buildings filling continuously. That means a constant stream of packaging waste alongside genuine furniture collections.",
    housing: "New mid-rise apartment buildings mixed with townhouses and villas.",
    access:
      "Ongoing construction affects road access in several districts, so we confirm the nearest usable approach before arrival.",
    commonJobs: [
      "Move-in packaging and cardboard clearance",
      "Apartment furniture removal at lease end",
      "Townhouse garage clear-outs",
    ],
    popularServices: ["junk-removal", "free-item-collection", "same-day-collection"],
  },
  {
    slug: "jumeirah-village-triangle",
    name: "Jumeirah Village Triangle (JVT)",
    region: "New Dubai",
    type: "mixed",
    landmarks: "JVT district parks, Al Khail Road",
    intro:
      "JVT is quieter and more villa-weighted than its neighbouring circle, with families staying longer. Clearances here tend to be larger and planned well in advance.",
    housing: "Townhouses and villas with a smaller share of low-rise apartments.",
    access: "Easy street and driveway parking; low traffic pressure outside peak hours.",
    commonJobs: [
      "Family villa clearances at relocation",
      "Garden and outdoor furniture removal",
      "Appliance replacement collections",
    ],
    popularServices: ["house-clearance", "appliance-removal", "garden-waste-removal"],
  },
  {
    slug: "dubai-hills-estate",
    name: "Dubai Hills Estate",
    region: "Central Dubai",
    type: "mixed",
    landmarks: "Dubai Hills Mall, Dubai Hills Golf Club",
    intro:
      "Dubai Hills is a newer community where most furniture is only a few years old. Condition is generally high, so a large share of items here qualify for free collection.",
    housing: "New villas, townhouses and premium apartment buildings.",
    access: "Wide roads and modern loading provisions; apartment towers require lift booking.",
    commonJobs: [
      "Nearly-new furniture removal after layout changes",
      "Move-in packaging clearance",
      "Garden setup debris from new villas",
    ],
    popularServices: ["free-item-collection", "furniture-removal", "junk-removal"],
  },
  {
    slug: "arjan",
    name: "Arjan",
    region: "Dubailand & South",
    type: "apartment",
    landmarks: "Dubai Miracle Garden, Butterfly Garden",
    intro:
      "Arjan's building stock is young and tenant turnover is high, producing frequent small apartment clearances rather than large villa jobs.",
    housing: "Affordable mid-rise apartment buildings, mostly studios to two bedrooms.",
    access: "Basement parking with height limits in several buildings; we check clearance before booking.",
    commonJobs: [
      "Studio and one-bed apartment clearances",
      "Mattress and bed base disposal",
      "Packaging and moving waste removal",
    ],
    popularServices: ["mattress-disposal", "junk-removal", "free-item-collection"],
  },
  {
    slug: "al-furjan",
    name: "Al Furjan",
    region: "New Dubai",
    type: "mixed",
    landmarks: "Al Furjan Pavilion, Discovery Gardens metro link",
    intro:
      "Al Furjan blends townhouses with newer apartment buildings, and its steady family occupancy produces well-maintained furniture that regularly qualifies for free pickup.",
    housing: "Townhouses, villas and recently completed apartment towers.",
    access: "Good road access; townhouse driveways make loading simple.",
    commonJobs: [
      "Townhouse furniture replacement",
      "Apartment lease-end clearances",
      "Small garden and terrace waste loads",
    ],
    popularServices: ["free-item-collection", "furniture-removal", "house-clearance"],
  },
  {
    slug: "discovery-gardens",
    name: "Discovery Gardens",
    region: "New Dubai",
    type: "apartment",
    landmarks: "Ibn Battuta Mall, Discovery Gardens metro station",
    intro:
      "Discovery Gardens has dense, affordable apartment blocks with frequent tenant changes. Jobs here are usually compact but numerous, and shared-accommodation bed removal is common.",
    housing: "Low-rise apartment clusters, mostly studios and one bedroom units.",
    access: "No lifts in many low-rise blocks, so stair carries are factored into every quote.",
    commonJobs: [
      "Walk-up apartment clearances",
      "Bunk bed and mattress disposal",
      "General clutter and storage clear-outs",
    ],
    popularServices: ["mattress-disposal", "junk-removal", "furniture-removal"],
  },
  {
    slug: "the-greens",
    name: "The Greens",
    region: "New Dubai",
    type: "apartment",
    landmarks: "Sheikh Zayed Road, Emirates Golf Club",
    intro:
      "The Greens is a settled low-rise community popular with long-term tenants. Furniture tends to be well cared for, and free-qualifying pieces are common at move-out.",
    housing: "Low-rise apartment buildings set around landscaped courtyards.",
    access: "Small lifts in older buildings; oversized furniture may need dismantling.",
    commonJobs: [
      "Apartment clearances at lease end",
      "Sofa and wardrobe removal requiring dismantling",
      "Appliance replacement collections",
    ],
    popularServices: ["free-item-collection", "furniture-removal", "appliance-removal"],
  },
  {
    slug: "the-views",
    name: "The Views",
    region: "New Dubai",
    type: "apartment",
    landmarks: "Emirates Golf Club, Al Thanyah canal walk",
    intro:
      "Adjacent to The Greens but with larger units, The Views produces slightly bigger apartment clearances and a higher share of quality dining and living-room furniture.",
    housing: "Mid-rise apartments overlooking the golf course and canal.",
    access: "Managed loading bays with lift booking required at most buildings.",
    commonJobs: [
      "Two and three bedroom apartment clearances",
      "Dining set and sofa collections",
      "Home-office furniture removal",
    ],
    popularServices: ["free-item-collection", "house-clearance", "furniture-removal"],
  },
  {
    slug: "motor-city",
    name: "Motor City",
    region: "Dubailand & South",
    type: "mixed",
    landmarks: "Dubai Autodrome, First Avenue Mall",
    intro:
      "Motor City's mix of apartments and townhouses suits families who stay several years, so clearances here are often full-home rather than single-item.",
    housing: "Apartment buildings around a central boulevard plus townhouse clusters.",
    access: "Straightforward parking; townhouse rear access helps with bulky loads.",
    commonJobs: [
      "Full apartment and townhouse clearances",
      "Children's furniture and toy clear-outs",
      "Balcony and terrace furniture removal",
    ],
    popularServices: ["house-clearance", "free-item-collection", "junk-removal"],
  },
  {
    slug: "sports-city",
    name: "Dubai Sports City",
    region: "Dubailand & South",
    type: "apartment",
    landmarks: "ICC Academy, Els Golf Club",
    intro:
      "Sports City apartments are largely tenant-occupied with regular turnover. Exercise equipment appears here more than anywhere else in Dubai, and working units often qualify for free collection.",
    housing: "Mid-rise apartment towers with a high share of rental units.",
    access: "Basement parking with height restrictions in several towers.",
    commonJobs: [
      "Exercise and gym equipment collection",
      "Apartment lease-end clearances",
      "Mattress and bed disposal",
    ],
    popularServices: ["free-item-collection", "mattress-disposal", "junk-removal"],
  },
  {
    slug: "damac-hills",
    name: "DAMAC Hills",
    region: "Dubailand & South",
    type: "villa",
    landmarks: "Trump International Golf Club, The Park",
    intro:
      "DAMAC Hills villas are relatively new, so furniture is modern and generally in good condition. Garden setups are still maturing, which produces regular landscaping waste alongside furniture jobs.",
    housing: "Villas and townhouses set around a golf course, plus some apartment blocks.",
    access: "Gated community registration required; driveway loading is easy once inside.",
    commonJobs: [
      "Landscaping and garden setup debris",
      "Villa furniture upgrades",
      "Garage and storeroom clear-outs",
    ],
    popularServices: ["garden-waste-removal", "free-item-collection", "house-clearance"],
  },
  {
    slug: "town-square",
    name: "Town Square Dubai",
    region: "Dubailand & South",
    type: "mixed",
    landmarks: "Town Square Park, Al Qudra Road",
    intro:
      "Town Square is a young community with continuous handovers, so packaging waste and first-time furniture changes dominate the work we do here.",
    housing: "Apartment buildings and townhouses aimed at first-time buyers and young families.",
    access: "New, wide roads with good access; apartment blocks require lift coordination.",
    commonJobs: [
      "Handover packaging and cardboard clearance",
      "Townhouse furniture replacement",
      "Small apartment clear-outs",
    ],
    popularServices: ["junk-removal", "free-item-collection", "furniture-removal"],
  },
  {
    slug: "mudon",
    name: "Mudon",
    region: "Dubailand & South",
    type: "villa",
    landmarks: "Mudon Central Park, Al Qudra Road",
    intro:
      "Mudon is a family villa community close to our Arabian Ranches 2 base, which makes scheduling flexible. Garden and garage clearances are the most frequent request here.",
    housing: "Townhouses and semi-detached villas with private gardens.",
    access: "Simple driveway loading; community gate notification needed for larger vehicles.",
    commonJobs: [
      "Garden waste and trimming loads",
      "Garage and bike storage clear-outs",
      "Children's furniture replacement",
    ],
    popularServices: ["garden-waste-removal", "free-item-collection", "house-clearance"],
  },
  {
    slug: "remraam",
    name: "Remraam",
    region: "Dubailand & South",
    type: "apartment",
    landmarks: "Al Qudra Road, Remraam community pools",
    intro:
      "Remraam's low-rise blocks house long-term family tenants, so collections here tend to be planned around relocations rather than quick turnovers.",
    housing: "Low-rise apartment buildings arranged around shared courtyards.",
    access: "Limited lift availability in some blocks; stair carries are quoted in advance.",
    commonJobs: [
      "Relocation clearances",
      "Bulk furniture removal from upper floors",
      "Mattress and bed base disposal",
    ],
    popularServices: ["house-clearance", "mattress-disposal", "furniture-removal"],
  },
  {
    slug: "the-sustainable-city",
    name: "The Sustainable City",
    region: "Dubailand & South",
    type: "villa",
    landmarks: "Al Qudra Road, the biodome greenhouses",
    intro:
      "Residents here care about where items end up, and reuse-first collection fits the community's ethos. We separate reusable pieces from waste more rigorously on these jobs than anywhere else.",
    housing: "Family villas with shared green spaces and community farming plots.",
    access: "Vehicle access is restricted inside the residential clusters; loading points are agreed in advance.",
    commonJobs: [
      "Reuse-focused furniture collections",
      "Garden and planting waste removal",
      "Household declutter clearances",
    ],
    popularServices: ["free-item-collection", "garden-waste-removal", "junk-removal"],
  },
  {
    slug: "dubai-silicon-oasis",
    name: "Dubai Silicon Oasis",
    region: "Dubailand & South",
    type: "mixed",
    landmarks: "Dubai Digital Park, Silicon Central",
    intro:
      "Silicon Oasis pairs residential towers with offices and light-industrial units, so the same route can include desks, server racks and household furniture.",
    housing: "Apartment towers, villas and a large commercial and academic cluster.",
    access: "Commercial units usually have loading bays; residential towers need lift bookings.",
    commonJobs: [
      "Office desk and chair clearances",
      "Apartment lease-end removals",
      "Electronics and equipment collection",
    ],
    popularServices: ["property-clearance", "free-item-collection", "junk-removal"],
  },
  {
    slug: "mirdif",
    name: "Mirdif",
    region: "Old Dubai",
    type: "villa",
    landmarks: "City Centre Mirdif, Mushrif Park",
    intro:
      "Mirdif has a settled, long-term resident base with independent villas and villa compounds. Clearances here often involve years of accumulated household contents.",
    housing: "Independent villas and gated compound villas with gardens.",
    access: "Residential street parking; larger vehicles need a planned approach on narrower lanes.",
    commonJobs: [
      "Long-term household clearances",
      "Garden and outdoor storage clear-outs",
      "Older appliance and furniture removal",
    ],
    popularServices: ["house-clearance", "appliance-removal", "garden-waste-removal"],
  },
  {
    slug: "deira",
    name: "Deira",
    region: "Old Dubai",
    type: "mixed",
    landmarks: "Dubai Creek, Gold Souk, Al Rigga",
    intro:
      "Deira's older buildings and dense commercial streets require careful scheduling. Loading windows are short, so we plan compact, efficient visits rather than long on-site jobs.",
    housing: "Older apartment blocks above street-level shops and small commercial units.",
    access: "Very limited kerbside space and heavy traffic; early morning slots are strongly preferred.",
    commonJobs: [
      "Small shop and office clear-outs",
      "Apartment furniture removal from walk-up buildings",
      "Bulk clutter and storage clearance",
    ],
    popularServices: ["property-clearance", "junk-removal", "furniture-removal"],
  },
  {
    slug: "bur-dubai",
    name: "Bur Dubai",
    region: "Old Dubai",
    type: "mixed",
    landmarks: "Al Fahidi, Meena Bazaar, Dubai Creek",
    intro:
      "Bur Dubai combines heritage streets with dense residential blocks. Access planning matters more than load size here, and we confirm the nearest legal loading point before every job.",
    housing: "Older apartment buildings and mixed residential-commercial blocks.",
    access: "Narrow streets and restricted parking; permits may be needed in some zones.",
    commonJobs: [
      "Apartment clearances in older buildings",
      "Retail unit fittings removal",
      "Mattress and furniture disposal",
    ],
    popularServices: ["junk-removal", "mattress-disposal", "property-clearance"],
  },
  {
    slug: "al-quoz",
    name: "Al Quoz",
    region: "Central Dubai",
    type: "commercial",
    landmarks: "Alserkal Avenue, Al Quoz industrial areas",
    intro:
      "Al Quoz is Dubai's workshop and warehouse belt, so jobs here are larger, heavier and more commercial. Surplus office furniture and shelving from these units frequently finds a second use.",
    housing: "Warehouses, workshops, studios and staff accommodation blocks.",
    access: "Loading bays and forklift access available at most units; wide vehicle access throughout.",
    commonJobs: [
      "Warehouse surplus and shelving clearance",
      "Studio and gallery fit-out removals",
      "Bulk office furniture collections",
    ],
    popularServices: ["property-clearance", "junk-removal", "free-item-collection"],
  },
  {
    slug: "al-safa",
    name: "Al Safa",
    region: "Central Dubai",
    type: "villa",
    landmarks: "Safa Park, Al Wasl Road",
    intro:
      "Al Safa villas sit close to the city centre and are frequently renovated rather than replaced. That produces a steady mix of quality furniture and construction leftovers.",
    housing: "Established villas on generous plots along Al Wasl and Al Safa roads.",
    access: "Driveway loading with straightforward road access from Al Wasl Road.",
    commonJobs: [
      "Renovation clearances",
      "Villa furniture upgrades",
      "Garden and pool area clear-outs",
    ],
    popularServices: ["junk-removal", "free-item-collection", "garden-waste-removal"],
  },
  {
    slug: "al-wasl",
    name: "Al Wasl",
    region: "Central Dubai",
    type: "mixed",
    landmarks: "Box Park, Jumeirah Road, City Walk edge",
    intro:
      "Al Wasl mixes villas with boutique low-rise apartments and small studios. Design-conscious residents here often replace furniture while it is still in excellent condition.",
    housing: "Villas alongside boutique apartment buildings and creative studios.",
    access: "Kerbside loading on quieter side streets; main road access can be busy at peak times.",
    commonJobs: [
      "Designer furniture collection",
      "Small studio and office clearances",
      "Villa declutter jobs",
    ],
    popularServices: ["luxury-item-collection", "free-item-collection", "furniture-removal"],
  },
  {
    slug: "city-walk",
    name: "City Walk",
    region: "Central Dubai",
    type: "apartment",
    landmarks: "City Walk boulevard, Coca-Cola Arena",
    intro:
      "City Walk apartments are modern and well-maintained, and residents tend to restyle rather than clear out. Single premium pieces make up most collections here.",
    housing: "Contemporary low and mid-rise apartments above retail streets.",
    access: "Retail-managed service access with fixed delivery hours; concierge coordination required.",
    commonJobs: [
      "Single furniture piece collections",
      "Appliance replacement removals",
      "Apartment declutter jobs",
    ],
    popularServices: ["luxury-item-collection", "free-item-collection", "appliance-removal"],
  },
  {
    slug: "dubai-creek-harbour",
    name: "Dubai Creek Harbour",
    region: "Central Dubai",
    type: "apartment",
    landmarks: "Creek Marina, Ras Al Khor sanctuary views",
    intro:
      "Creek Harbour is still filling with new residents, so move-in packaging clearance is the most common request, followed by furniture that did not suit the final layout.",
    housing: "New waterfront apartment towers with managed facilities.",
    access: "Modern loading bays and service lifts, booked through building management.",
    commonJobs: [
      "Move-in packaging and cardboard removal",
      "Furniture that did not fit the new layout",
      "Balcony furniture collection",
    ],
    popularServices: ["junk-removal", "free-item-collection", "furniture-removal"],
  },
  {
    slug: "mohammed-bin-rashid-city",
    name: "Mohammed Bin Rashid City (MBR City)",
    region: "Central Dubai",
    type: "mixed",
    landmarks: "Crystal Lagoon, Meydan",
    intro:
      "MBR City's districts range from lagoon villas to new apartment clusters. Villa jobs here are large and usually booked well in advance around handover schedules.",
    housing: "Lagoon-front villas, mansions and newly completed apartment districts.",
    access: "Wide access roads; gated districts require pre-registration with security.",
    commonJobs: [
      "Large villa clearances at handover",
      "Landscaping and garden setup waste",
      "Premium furniture collections",
    ],
    popularServices: ["house-clearance", "luxury-item-collection", "garden-waste-removal"],
  },
  {
    slug: "meydan",
    name: "Meydan",
    region: "Central Dubai",
    type: "mixed",
    landmarks: "Meydan Racecourse, Nad Al Sheba",
    intro:
      "Meydan's villa districts and newer apartment blocks sit close to central Dubai but with easier vehicle access, which makes larger clearances simpler to schedule here.",
    housing: "Villas, townhouses and new mid-rise apartment buildings.",
    access: "Good road access and driveway loading in the villa districts.",
    commonJobs: [
      "Villa and townhouse clearances",
      "Garden waste after landscaping",
      "Home gym and office equipment removal",
    ],
    popularServices: ["house-clearance", "garden-waste-removal", "free-item-collection"],
  },
  {
    slug: "dubai-investment-park",
    name: "Dubai Investment Park (DIP)",
    region: "Dubailand & South",
    type: "commercial",
    landmarks: "Green Community, DIP industrial zones",
    intro:
      "DIP combines industrial units with residential clusters, so jobs here span warehouse surplus and family household clearances within a short drive of each other.",
    housing: "Warehouses, staff accommodation and the residential Green Community.",
    access: "Excellent vehicle access and loading space across the industrial zones.",
    commonJobs: [
      "Warehouse and workshop clearances",
      "Staff accommodation furniture removal",
      "Bulk mattress and bunk bed disposal",
    ],
    popularServices: ["property-clearance", "mattress-disposal", "junk-removal"],
  },
  {
    slug: "international-city",
    name: "International City",
    region: "Old Dubai",
    type: "apartment",
    landmarks: "Dragon Mart, the country clusters",
    intro:
      "International City has high tenant turnover across compact units, so collections here are frequent, small and best batched into a single route.",
    housing: "Low-rise apartment clusters, mostly studios and one bedroom units.",
    access: "Limited lifts in many buildings and busy parking areas; stair carries are common.",
    commonJobs: [
      "Studio clearances at lease end",
      "Mattress and bed disposal",
      "General household junk removal",
    ],
    popularServices: ["mattress-disposal", "junk-removal", "furniture-removal"],
  },
  {
    slug: "dubai-production-city",
    name: "Dubai Production City (IMPZ)",
    region: "New Dubai",
    type: "mixed",
    landmarks: "City Centre Me'aisem, IMPZ lakes",
    intro:
      "Production City mixes residential towers with media and print businesses, producing a balance of apartment collections and small commercial clearances.",
    housing: "Apartment towers alongside business and light-industrial units.",
    access: "Loading bays at commercial units; residential towers require lift booking.",
    commonJobs: [
      "Apartment lease-end clearances",
      "Small office furniture removal",
      "Equipment and shelving clearance",
    ],
    popularServices: ["property-clearance", "free-item-collection", "junk-removal"],
  },
  {
    slug: "barsha-heights",
    name: "Barsha Heights (Tecom)",
    region: "Central Dubai",
    type: "mixed",
    landmarks: "Internet City metro, Sheikh Zayed Road",
    intro:
      "Barsha Heights is dense with serviced apartments and small offices, so short-notice collections around lease changes are the norm here.",
    housing: "High-rise serviced apartments and compact commercial floors.",
    access: "Shared basement loading bays that fill early; morning slots work best.",
    commonJobs: [
      "Serviced apartment furniture refreshes",
      "Small office clear-outs",
      "Mattress and bed base disposal",
    ],
    popularServices: ["same-day-collection", "property-clearance", "mattress-disposal"],
  },
  {
    slug: "media-city",
    name: "Dubai Media City",
    region: "New Dubai",
    type: "commercial",
    landmarks: "Media City amphitheatre, Palm Jumeirah access road",
    intro:
      "Media City work is overwhelmingly commercial: studio changes, office moves and equipment refreshes. Serviceable desks and task chairs from here are strong reuse candidates.",
    housing: "Office campuses, studios and a small number of residential towers nearby.",
    access: "Facilities-managed loading bays with security passes arranged in advance.",
    commonJobs: [
      "Office move-out clearances",
      "Studio set and prop disposal",
      "Bulk desk and chair collections",
    ],
    popularServices: ["property-clearance", "free-item-collection", "junk-removal"],
  },
  {
    slug: "internet-city",
    name: "Dubai Internet City",
    region: "New Dubai",
    type: "commercial",
    landmarks: "DIC metro station, Knowledge Park",
    intro:
      "Internet City clearances usually follow office consolidations. We separate reusable furniture and coordinate with facilities teams so floors are handed back on schedule.",
    housing: "Corporate office buildings and campus-style business parks.",
    access: "Scheduled loading bay slots and security-issued access passes.",
    commonJobs: [
      "Office consolidation clearances",
      "Meeting room furniture removal",
      "Storage and archive clear-outs",
    ],
    popularServices: ["property-clearance", "free-item-collection", "junk-removal"],
  },
  {
    slug: "the-lakes",
    name: "The Lakes",
    region: "New Dubai",
    type: "villa",
    landmarks: "Emirates Living, The Lakes Club",
    intro:
      "The Lakes is a quiet, mature villa community where homes are renovated rather than replaced. Quality furniture from these renovations regularly qualifies for free collection.",
    housing: "Large family villas around landscaped lakes.",
    access: "Easy driveway loading with community gate registration.",
    commonJobs: [
      "Renovation-related furniture clearances",
      "Mature garden waste loads",
      "Full villa clearances at relocation",
    ],
    popularServices: ["free-item-collection", "house-clearance", "garden-waste-removal"],
  },
  {
    slug: "nad-al-sheba",
    name: "Nad Al Sheba",
    region: "Central Dubai",
    type: "villa",
    landmarks: "Meydan Racecourse, Nad Al Sheba Cycle Track",
    intro:
      "Nad Al Sheba's large family villas produce substantial clearances, and their generous plots mean garden and outdoor storage jobs are just as common as indoor ones.",
    housing: "Spacious villas on large plots with outbuildings and gardens.",
    access: "Wide roads and ample driveway space for larger vehicles.",
    commonJobs: [
      "Large villa and outbuilding clearances",
      "Garden and landscaping waste",
      "Bulk furniture and appliance removal",
    ],
    popularServices: ["house-clearance", "garden-waste-removal", "appliance-removal"],
  },
  {
    slug: "dubai-south",
    name: "Dubai South",
    region: "Dubailand & South",
    type: "mixed",
    landmarks: "Al Maktoum International Airport, Expo City",
    intro:
      "Dubai South is growing quickly, so most work here relates to first occupancy: packaging clearance, furniture that did not fit, and early commercial fit-out leftovers.",
    housing: "New residential districts, staff accommodation and business park units.",
    access: "New infrastructure with excellent vehicle access and loading space.",
    commonJobs: [
      "Move-in packaging clearance",
      "Business park fit-out leftovers",
      "Staff accommodation furniture removal",
    ],
    popularServices: ["junk-removal", "property-clearance", "free-item-collection"],
  },
];

export const areaBySlug = (slug: string) => areas.find((a) => a.slug === slug);

export const areasByRegion = () => {
  const map = new Map<string, Area[]>();
  for (const a of areas) {
    map.set(a.region, [...(map.get(a.region) ?? []), a]);
  }
  return [...map.entries()];
};
