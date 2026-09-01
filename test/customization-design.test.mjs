import assert from "node:assert/strict";
import test from "node:test";
import { customizationDesign } from "../src/lib/customization-design.ts";

test("customizationDesign removes blank text and normalizes retained layers", () => {
  const result = customizationDesign(
    [
      {
        text: "  A gift  ",
        x: 10,
        y: 20,
        fontSize: 24,
        fontFamily: "Inter",
        color: "#aabbcc",
        rotation: 0,
      },
      {
        text: "   ",
        x: 0,
        y: 0,
        fontSize: 12,
        fontFamily: "Inter",
        color: "#000000",
        rotation: 0,
      },
    ],
    [],
  );

  assert.equal(result.canvasWidth, 400);
  assert.equal(result.canvasHeight, 300);
  assert.deepEqual(result.textLayers, [
    {
      text: "A gift",
      x: 10,
      y: 20,
      fontSize: 24,
      fontFamily: "Inter",
      color: "#AABBCC",
      rotation: 0,
    },
  ]);
});
