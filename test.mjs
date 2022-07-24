import { argv } from "process";
import { Warzone } from "./dist/index.js";

if (process.argv.length < 4) {
  console.error(`Missing argument, you need to provide the filename of the adapter to test.
    Eg: node test.mjs <gamertag> <platform>`);
  process.exit(1);
}

(async () => {
  const profile = await Warzone.fullData(argv[2], argv[3]);
  console.log(profile.data.username, profile.data.platform, profile.data.type);

  const history = await Warzone.combatHistory(argv[2], argv[3]);
  console.log("Matches: " + history.data.matches.length);

  const breakdown = await Warzone.breakdown(argv[2], argv[3]);
  console.log("Breakdown: " + breakdown.data.length);
  process.exit(0);
})();
