import test from "node:test";
import assert from "node:assert/strict";
import { buildDayPlan, dayRegions, normalizeDayOptions } from "./dayPlanner.js";

test("every region and time window produces distinct stops and a directions link", () => {
  for (const region of dayRegions) {
    for (const hours of [4, 6, 8]) {
      const plan = buildDayPlan({ region: region.id, hours, interests: ["coast", "culture", "nature", "food"] });
      assert.ok(plan.stops.length >= 2);
      assert.equal(new Set(plan.stops.map((stop) => stop.id)).size, plan.stops.length);
      assert.equal(plan.stops.filter((stop) => stop.type === "food").length, 1);
      assert.ok(plan.mapLegs.length >= 1);
      for (const url of plan.mapLegs) {
        assert.match(url, /^https:\/\/www\.google\.com\/maps\/dir\//);
        const waypoints = new URL(url).searchParams.get("waypoints")?.split("|") || [];
        assert.ok(waypoints.length <= 3);
      }
      for (const stop of plan.stops) assert.ok(stop.name && stop.nameMl && stop.mapsQuery);
    }
  }
});

test("unrecognized shared-link parameters normalize safely", () => {
  assert.deepEqual(normalizeDayOptions({ region: "unknown", hours: 200, interests: ["unknown"] }), {
    region: "kannur", hours: 6, interests: ["coast", "culture"],
  });
});

test("food is omitted when not selected", () => {
  const plan = buildDayPlan({ region: "thalassery", hours: 4, interests: ["coast", "culture"] });
  assert.equal(plan.stops.some((stop) => stop.type === "food"), false);
});
