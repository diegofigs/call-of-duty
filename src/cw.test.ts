import { breakdown, combatHistory, fullData } from "./cw";
import { platforms } from "./types";

const gamertag = "RipNDip#11945";
describe("cw", () => {
  it("fullData should fetch player profile", async () => {
    const { data } = await fullData(gamertag, platforms.Battlenet);
    expect(data.username).toEqual(gamertag);
  });
  it("combatHistory should fetch player history", async () => {
    const response = await combatHistory(gamertag, platforms.Battlenet);
    const { summary, matches } = response.data;
    for (const stat of Object.values(summary.all)) {
      expect(stat).toBeGreaterThanOrEqual(0);
    }

    expect(matches.length).toBeGreaterThanOrEqual(0);
    for (const match of matches) {
      expect(match.matchID).toBeTruthy();
      expect(match.duration).toBeGreaterThan(0);
      expect(match.utcStartSeconds).toBeGreaterThan(0);
      expect(match.utcEndSeconds).toBeGreaterThan(0);
    }
  });
  it("breakdown should fetch player matches", async () => {
    const { data: matches } = await breakdown(gamertag, platforms.Battlenet);

    expect(matches.length).toBeGreaterThanOrEqual(0);
    for (const match of matches) {
      expect(match.matchId).toBeTruthy();
      expect(match.timestamp).toBeGreaterThan(0);
    }
  });
});
