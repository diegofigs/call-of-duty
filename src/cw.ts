import { sendRequest } from "./api";
import { platforms, PlatformValues } from "./types";
import { parsePlayer, parsePlayerPlatform } from "./utils";

export const fullData = async (
  gamertag: string,
  platform: platforms | PlatformValues
) => {
  const { lookupType, parsedGamertag, parsedPlatform } = parsePlayer(
    gamertag,
    platform
  );
  return sendRequest(
    `/stats/cod/v1/title/cw/platform/${parsedPlatform}/${lookupType}/${parsedGamertag}/profile/type/mp`
  );
};

export const combatHistory = async (
  gamertag: string,
  platform: platforms | PlatformValues,
  startTime = 0,
  endTime = 0
) => {
  const { lookupType, parsedGamertag, parsedPlatform } = parsePlayer(
    gamertag,
    platform
  );
  return sendRequest(
    `/crm/cod/v2/title/cw/platform/${parsedPlatform}/${lookupType}/${parsedGamertag}/matches/mp/start/${startTime}/end/${endTime}/details`
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
  platform: platforms | PlatformValues,
  startTime = 0,
  endTime = 0
) => {
  const { lookupType, parsedGamertag, parsedPlatform } = parsePlayer(
    gamertag,
    platform
  );
  return sendRequest(
    `/crm/cod/v2/title/cw/platform/${parsedPlatform}/${lookupType}/${parsedGamertag}/matches/mp/start/${startTime}/end/${endTime}`
  );
};

export const breakdownWithDate = async (
  gamertag: string,
  startTime: number,
  endTime: number,
  platform: platforms | PlatformValues
) => {
  return breakdown(gamertag, platform, startTime, endTime);
};

export const seasonloot = async (
  gamertag: string,
  platform: platforms | PlatformValues
) => {
  const { lookupType, parsedGamertag, parsedPlatform } = parsePlayer(
    gamertag,
    platform
  );
  return await sendRequest(
    `/loot/title/cw/platform/${parsedPlatform}/${lookupType}/${parsedGamertag}/status/en`
  );
};

export const mapList = async (platform: platforms | PlatformValues) => {
  const parsedPlatform = parsePlayerPlatform(platform);
  return await sendRequest(
    `/ce/v1/title/cw/platform/${parsedPlatform}/gameType/mp/communityMapData/availability`
  );
};

export const matchInfo = async (
  matchId: string,
  platform: platforms | PlatformValues
) => {
  const parsedPlatform = parsePlayerPlatform(platform);
  return await sendRequest(
    `/crm/cod/v2/title/cw/platform/${parsedPlatform}/fullMatch/mp/${matchId}/en`
  );
};
