import assert from "node:assert/strict";
import test from "node:test";
import { formatMoney } from "../src/lib/format-money.ts";

test("formatMoney converts integer cents with the requested currency", () => {
  assert.equal(formatMoney(1234, "USD"), "$12.34");
  assert.equal(formatMoney(0, "USD"), "$0.00");
});
