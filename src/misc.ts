import { getRequest } from "./api";
import { platforms } from "./types";
import { isPcPlayerPlatform, parseProfilePlatform } from "./utils";

export const search = async (gamertag: string, platform: platforms) => {
  const parsedGamertag = isPcPlayerPlatform(platform) ? encodeURIComponent(gamertag) : gamertag;
  const parsedPlatform = parseProfilePlatform(platform);
  return getRequest(`/crm/cod/v2/platform/${parsedPlatform}/username/${parsedGamertag}/search`);
}