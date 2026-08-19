/**
 * FAQ content. CMS-ready: maps to a Payload "FAQs" collection with a category field.
 */

export type Faq = { question: string; answer: string; category: "free" | "pricing" | "booking" | "practical" };

export const faqs: Faq[] = [
  {
    category: "free",
    question: "How can collection be free?",
    answer:
      "Because reusable items still hold value. When furniture, appliances or quality homeware can be passed on and used again, that resale or reuse value covers the cost of collecting them. Items with no reuse value cost money to move and dispose of, so those are quoted as a paid service.",
  },
  {
    category: "free",
    question: "How do I know if my items qualify for free collection?",
    answer:
      "Send clear photos on WhatsApp showing the whole item, any damage and the room it sits in. We review condition, completeness and current demand, then confirm in writing which pieces qualify before anyone travels to you.",
  },
  {
    category: "free",
    question: "What if only some of my items qualify?",
    answer:
      "That is the most common outcome. Qualifying pieces are collected free and everything else is quoted separately. You see both parts before you agree to anything, and you can accept only the free portion if you prefer.",
  },
  {
    category: "free",
    question: "Do you pay for items?",
    answer:
      "No. This is a free collection service, not a buying service. We do not offer cash, valuations or appraisals for any item.",
  },
  {
    category: "pricing",
    question: "How is paid work priced?",
    answer:
      "On volume, weight and access. A ground-floor villa load and a fifth-floor apartment load of the same size are different jobs. We quote from your photos so the figure is agreed before we arrive, with no on-the-day increases unless the load changes.",
  },
  {
    category: "pricing",
    question: "Are there hidden charges?",
    answer:
      "No. The quote covers labour, loading, transport and disposal for the items shown in your photos. If you add items on the day, we re-quote that addition openly before touching it.",
  },
  {
    category: "booking",
    question: "How quickly can you collect?",
    answer:
      "It depends on the day and the area. Send photos as early as possible if you have a handover or inspection deadline, and we will tell you honestly whether a slot exists rather than promising a window we cannot hold.",
  },
  {
    category: "booking",
    question: "Do I need to be at the property?",
    answer:
      "Someone with authority to release the items should be present, or you can arrange access through building security or a representative. We confirm the arrangement with you in advance.",
  },
  {
    category: "practical",
    question: "Do I need to carry anything downstairs?",
    answer:
      "No. Our team loads from inside the property. Stairs, long corridor carries and lift restrictions are factored into the assessment beforehand.",
  },
  {
    category: "practical",
    question: "Do you dismantle furniture?",
    answer:
      "Yes, where dismantling is needed to get a piece out safely. Tell us about oversized wardrobes or beds when you send photos so we plan the right team and tools.",
  },
  {
    category: "practical",
    question: "Which areas of Dubai do you cover?",
    answer:
      "We cover residential and commercial addresses across Dubai, from Downtown and Marina through to the villa communities in Dubailand and along Al Qudra Road. See the service areas page for the full list.",
  },
  {
    category: "practical",
    question: "What will you not take?",
    answer:
      "Chemicals, paint, fuels, gas cylinders, medical waste, asbestos and anything else requiring specialist licensed disposal. If you are unsure, send a photo and we will tell you before booking.",
  },
];
