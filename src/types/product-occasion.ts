export const productOccasionValues = [
  "wedding",
  "birthday",
  "corporate",
] as const;

export type ProductOccasion = (typeof productOccasionValues)[number];

export const productOccasionOptions: Array<{
  value: ProductOccasion;
  label: string;
}> = [
  { value: "wedding", label: "Wedding" },
  { value: "birthday", label: "Birthday" },
  { value: "corporate", label: "Corporate" },
];
