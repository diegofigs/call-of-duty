import { argv } from "process";
import { Warzone, ModernWarfare, Vanguard, ColdWar } from "./dist/index.js";
import { breakdown } from "./dist/wz.js";
import { breakdownWithDate } from "./dist/mw.js";
import { combatHistory } from "./dist/vg.js";
import { combatHistoryWithDate } from "./dist/cw.js";

if (process.argv.length < 4) {
  console.error(`Missing argument, you need to provide the filename of the adapter to test.
    Eg: node test.mjs <gamertag> <platform>`);
  process.exit(1);
}

(async () => {
  const wzProfile = await Warzone.fullData(argv[2], argv[3]);
  const mwProfile = await ModernWarfare.fullData(argv[2], argv[3]);
  const vgProfile = await Vanguard.fullData(argv[2], argv[3]);
  const cwProfile = await ColdWar.fullData(argv[2], argv[3]);

  const wzBreakdown = await breakdown(argv[2], argv[3]);
  const mwBreakdown = await breakdownWithDate(argv[2], 0, 0, argv[3]);
  const vgCombat = await combatHistory(argv[2], argv[3]);
  const cwCombat = await combatHistoryWithDate(argv[2], 0, 0, argv[3]);

  console.log("WZ Profile: ", wzProfile.data.platform, wzProfile.data.type);
  console.log("WZ Breakdown: " + wzBreakdown.data.length);
  console.log("MW Profile: ", mwProfile.data.platform, mwProfile.data.type);
  console.log("MW Breakdown (Date): " + mwBreakdown.data.length);
  console.log("VG Profile: ", vgProfile.data.platform, vgProfile.data.type);
  console.log("VG Combat: " + vgCombat.data.matches?.length);
  console.log("CW Profile: ", cwProfile.data.platform, cwProfile.data.type);
  console.log("CW Combat (Date): " + cwCombat.data.matches?.length);

  process.exit(0);
})();
