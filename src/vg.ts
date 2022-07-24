import { sendRequest } from "./api";
import { CombatHistory, FullData, MatchIndex, platforms } from "./types";
import { parsePlayer } from "./utils";

export const fullData = async (
  gamertag: string,
  platform: platforms
): Promise<{ success: string; data: FullData }> => {
  const { lookupType, parsedGamertag, parsedPlatform } = parsePlayer(
    gamertag,
    platform
  );
  return await sendRequest(
    `/stats/cod/v1/title/vg/platform/${parsedPlatform}/${lookupType}/${parsedGamertag}/profile/type/mp`
  );
};

export const combatHistory = async (
  gamertag: string,
  platform: platforms,
  startTime = 0,
  endTime = 0
): Promise<{ success: string; data: CombatHistory }> => {
  const { lookupType, parsedGamertag, parsedPlatform } = parsePlayer(
    gamertag,
    platform
  );
  return await sendRequest(
    `/crm/cod/v2/title/vg/platform/${parsedPlatform}/${lookupType}/${parsedGamertag}/matches/mp/start/${startTime}/end/${endTime}/details`
  );
};

export const combatHistoryWithDate = async (
  gamertag: string,
  startTime: number,
  endTime: number,
  platform: platforms
) => {
  return combatHistory(gamertag, platform, startTime, endTime);
};

export const breakdown = async (
  gamertag: string,
  platform: platforms,
  startTime = 0,
  endTime = 0
): Promise<{ success: string; data: Array<MatchIndex> }> => {
  const { lookupType, parsedGamertag, parsedPlatform } = parsePlayer(
    gamertag,
    platform
  );
  return await sendRequest(
    `/crm/cod/v2/title/vg/platform/${parsedPlatform}/${lookupType}/${parsedGamertag}/matches/mp/start/${startTime}/end/${endTime}`
  );
};

export const breakdownWithDate = async (
  gamertag: string,
  startTime: number,
  endTime: number,
  platform: platforms
) => {
  return breakdown(gamertag, platform, startTime, endTime);
};

export const seasonloot = async (gamertag: string, platform: platforms) => {
  const { lookupType, parsedGamertag, parsedPlatform } = parsePlayer(
    gamertag,
    platform
  );
  return await sendRequest(
    `/loot/title/vg/platform/${parsedPlatform}/${lookupType}/${parsedGamertag}/status/en`
  );
};

export const mapList = async (platform: platforms) => {
  if (platform === platforms.Steam)
    throw new Error("Steam Doesn't exist for VG. Try `battle` instead.");
  const parsedPlatform =
    platform === platforms.Activision ? platforms.Uno : platform;
  return await sendRequest(
    `/ce/v1/title/vg/platform/${parsedPlatform}/gameType/mp/communityMapData/availability`
  );
};

export const matchInfo = async (matchId: string, platform: platforms) => {
  if (platform === platforms.Steam)
    throw new Error("Steam Doesn't exist for VG. Try `battle` instead.");
  const parsedPlatform =
    platform === platforms.Activision ? platforms.Uno : platform;
  return await sendRequest(
    `/crm/cod/v2/title/vg/platform/${parsedPlatform}/fullMatch/mp/${matchId}/en`
  );
};
