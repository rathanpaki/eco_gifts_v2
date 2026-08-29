export const faqItems = [
  {
    question: "Can I change a personalised message after ordering?",
    answer:
      "You can edit it until the order enters production. Open Order history and choose “Edit personalisation”.",
    topic: "Personalisation",
  },
  {
    question: "How do I know a gift will arrive on time?",
    answer:
      "Delivery estimates appear during checkout and in your order details. Tracking is added as soon as the parcel ships.",
    topic: "Delivery",
  },
  {
    question: "What if my gift arrives damaged?",
    answer:
      "Open the order and contact support with a photo. We will review a replacement or refund without unnecessary return shipping.",
    topic: "Returns",
  },
  {
    question: "How are impact numbers calculated?",
    answer:
      "We use the verified materials, packaging, delivery choice, and contribution recorded with each order.",
    topic: "Impact",
  },
];

export const faqTopics = [
  ["Ordering", "Payments, changes, receipts", "12 articles"],
  ["Personalisation", "Messages, names, previews", "9 articles"],
  ["Delivery", "Tracking, timing, missed parcels", "14 articles"],
  ["Returns", "Damaged, incorrect, or unwanted gifts", "8 articles"],
] as const;
