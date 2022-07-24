import { sendRequest } from "./api";
import {
  MatchPlayer,
  platforms,
  MatchIndex,
  FullData,
  CombatHistory,
} from "./types";
import { parsePlayer } from "./utils";

export async function fullData(
  gamertag: string,
  platform: platforms
): Promise<{ success: string; data: FullData }> {
  const { lookupType, parsedGamertag, parsedPlatform } =
    parsePlayer(gamertag, platform);
  return await sendRequest(
    `/stats/cod/v1/title/mw/platform/${parsedPlatform}/${lookupType}/${parsedGamertag}/profile/type/wz`
  );
}

export async function combatHistory(
  gamertag: string,
  platform: platforms,
  startTime = 0,
  endTime = 0
): Promise<{ success: string; data: CombatHistory }> {
  const { lookupType, parsedGamertag, parsedPlatform } =
    parsePlayer(gamertag, platform);
  return sendRequest(
    `/crm/cod/v2/title/mw/platform/${parsedPlatform}/${lookupType}/${parsedGamertag}/matches/wz/start/${startTime}/end/${endTime}/details`
  );
}

export async function combatHistoryWithDate(
  gamertag: string,
  startTime: number,
  endTime: number,
  platform: platforms
) {
  return combatHistory(gamertag, platform, startTime, endTime);
}

export async function breakdown(
  gamertag: string,
  platform: platforms,
  startTime = 0,
  endTime = 0
): Promise<{ success: string; data: Array<MatchIndex> }> {
  const { lookupType, parsedGamertag, parsedPlatform } =
    parsePlayer(gamertag, platform);
  return sendRequest(
    `/crm/cod/v2/title/mw/platform/${parsedPlatform}/${lookupType}/${parsedGamertag}/matches/wz/start/${startTime}/end/${endTime}`
  );
}

export async function breakdownWithDate(
  gamertag: string,
  startTime: number,
  endTime: number,
  platform: platforms
) {
  return breakdown(gamertag, platform, startTime, endTime);
}

interface WarzoneMatchInfo {
  allPlayers: MatchPlayer[];
}

export async function matchInfo(
  matchId: string,
  platform: platforms
): Promise<{ success: string; data: WarzoneMatchInfo }> {
  if (platform === platforms.Steam)
    throw new Error("Steam Doesn't exist for MW. Try `battle` instead.");
  const parsedPlatform =
    platform === platforms.Activision ? platforms.Uno : platform;
  return await sendRequest(
    `/crm/cod/v2/title/mw/platform/${parsedPlatform}/fullMatch/wz/${matchId}/en`
  );
}
