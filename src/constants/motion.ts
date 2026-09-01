export const entranceSpring = {
  damping: 20,
  mass: 0.82,
  stiffness: 96,
  type: "spring" as const,
};

export const responsiveSpring = {
  damping: 24,
  mass: 0.72,
  stiffness: 140,
};

export const hoverSpring = {
  damping: 18,
  stiffness: 220,
  type: "spring" as const,
};
