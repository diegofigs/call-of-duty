import { getRequest } from "./api";
import { platforms, PlatformValues } from "./types";
import { parseProfilePlatform } from "./utils";

export const purchasableItems = async (gameId: string) => {
  return getRequest(`/inventory/v1/title/${gameId}/platform/psn/purchasable/public/en`);
};

export const bundleInformation = async(title: string, bundleId: string) => {
  return getRequest(`/inventory/v1/title/${title}/bundle/${bundleId}/en`);
};

export const battlePassLoot = async (season: number, platform: platforms | PlatformValues) => {
  const parsedPlatform = parseProfilePlatform(platform);
  return getRequest(`/loot/title/mw/platform/${parsedPlatform}/list/loot_season_${season}/en`);
};