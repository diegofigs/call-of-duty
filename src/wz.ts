import { getRequest } from "./api";
import {
  MatchPlayer,
  platforms,
  MatchIndex,
  FullData,
  CombatHistory,
  PlatformValues,
} from "./types";
import { parsePlayer, parsePlayerPlatform } from "./utils";

export async function fullData(
  gamertag: string,
  platform: platforms | PlatformValues
): Promise<{ data: FullData }> {
  const { lookupType, parsedGamertag, parsedPlatform } = parsePlayer(
    gamertag,
    platform
  );
  return getRequest(
    `/stats/cod/v1/title/mw/platform/${parsedPlatform}/${lookupType}/${parsedGamertag}/profile/type/wz`
  );
}

export async function combatHistory(
  gamertag: string,
  platform: platforms | PlatformValues,
  startTime = 0,
  endTime = 0
): Promise<{ success: string; data: CombatHistory }> {
  const { lookupType, parsedGamertag, parsedPlatform } = parsePlayer(
    gamertag,
    platform
  );
  return getRequest(
    `/crm/cod/v2/title/mw/platform/${parsedPlatform}/${lookupType}/${parsedGamertag}/matches/wz/start/${startTime}/end/${endTime}/details`
  );
}

export async function combatHistoryWithDate(
  gamertag: string,
  startTime: number,
  endTime: number,
  platform: platforms | PlatformValues
) {
  return combatHistory(gamertag, platform, startTime, endTime);
}

export async function breakdown(
  gamertag: string,
  platform: platforms | PlatformValues,
  startTime = 0,
  endTime = 0
): Promise<{ success: string; data: Array<MatchIndex> }> {
  const { lookupType, parsedGamertag, parsedPlatform } = parsePlayer(
    gamertag,
    platform
  );
  return getRequest(
    `/crm/cod/v2/title/mw/platform/${parsedPlatform}/${lookupType}/${parsedGamertag}/matches/wz/start/${startTime}/end/${endTime}`
  );
}

export async function breakdownWithDate(
  gamertag: string,
  startTime: number,
  endTime: number,
  platform: platforms | PlatformValues
) {
  return breakdown(gamertag, platform, startTime, endTime);
}

interface WarzoneMatchInfo {
  allPlayers: MatchPlayer[];
}

export async function matchInfo(
  matchId: string,
  platform: platforms | PlatformValues
): Promise<{ success: string; data: WarzoneMatchInfo }> {
  const parsedPlatform = parsePlayerPlatform(platform);
  return await getRequest(
    `/crm/cod/v2/title/mw/platform/${parsedPlatform}/fullMatch/wz/${matchId}/en`
  );
}
