import { argv } from "node:process";
import { Warzone, ModernWarfare, Vanguard, ColdWar, Me } from "./dist/index.js";

if (process.argv.length < 4) {
  console.error(`Missing argument, you need to provide the filename of the adapter to test.
    Eg: node test.mjs <gamertag> <platform>`);
  process.exit(1);
}

const wzProfile = await Warzone.fullData(argv[2], argv[3]);
const mwProfile = await ModernWarfare.fullData(argv[2], argv[3]);
const vgProfile = await Vanguard.fullData(argv[2], argv[3]);
const cwProfile = await ColdWar.fullData(argv[2], argv[3]);

const wzBreakdown = await Warzone.breakdown(argv[2], argv[3]);
const mwBreakdown = await ModernWarfare.breakdownWithDate(argv[2], 0, 0, argv[3]);
const vgCombat = await Vanguard.combatHistory(argv[2], argv[3]);
const cwCombat = await ColdWar.combatHistoryWithDate(argv[2], 0, 0, argv[3]);

console.log("WZ Profile: ", wzProfile.data.platform, wzProfile.data.type);
console.log("WZ Breakdown: " + wzBreakdown.data.length);
console.log("MW Profile: ", mwProfile.data.platform, mwProfile.data.type);
console.log("MW Breakdown (Date): " + mwBreakdown.data.length);
console.log("VG Profile: ", vgProfile.data.platform, vgProfile.data.type);
console.log("VG Combat: " + vgCombat.data.matches?.length);
console.log("CW Profile: ", cwProfile.data.platform, cwProfile.data.type);
console.log("CW Combat (Date): " + cwCombat.data.matches?.length);

const userProfile = await Me.connectedAccounts(argv[2], argv[3]);
const ids = await Me.loggedInIdentities(argv[2], argv[3]);
const points = await Me.codPoints(argv[2], argv[3]);
const settings = await Me.settings(argv[2], argv[3]);
console.log("User Profile: ", userProfile.data);
console.log("User Identities: ", ids.data.titleIdentities);
console.log("User Points: ", points.data.codPoints);
console.log("User Settings: ", settings.data);

process.exit(0);
