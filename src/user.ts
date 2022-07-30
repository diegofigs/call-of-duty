import { getRequest, getToken, postRequest } from "./api";
import { friendActions, platforms, PlatformValues } from "./types";
import {
  isPcPlayerPlatform,
  parseLookupType,
  parseProfilePlatform,
} from "./utils";

export const friendFeed = async (
  gamertag: string,
  platform: platforms | PlatformValues
) => {
  const parsedGamertag = isPcPlayerPlatform(platform)
    ? encodeURIComponent(gamertag)
    : gamertag;
  const parsedPlatform = parseProfilePlatform(platform);
  return getRequest(
    `/userfeed/v1/friendFeed/platform/${parsedPlatform}/gamer/${parsedGamertag}/friendFeedEvents/en`
  );
};

export const eventFeed = async () => {
  const baseSsoToken = getToken();
  return getRequest(`/userfeed/v1/friendFeed/rendered/en/${baseSsoToken}`);
};

export const loggedInIdentities = async () => {
  const baseSsoToken = getToken();
  return getRequest(`/crm/cod/v2/identities/${baseSsoToken}`);
};

export const codPoints = async (
  gamertag: string,
  platform: platforms | PlatformValues
) => {
  const parsedGamertag = isPcPlayerPlatform(platform)
    ? encodeURIComponent(gamertag)
    : gamertag;
  const parsedPlatform = parseProfilePlatform(platform);
  return getRequest(
    `/inventory/v1/title/mw/platform/${parsedPlatform}/gamer/${parsedGamertag}/currency`
  );
};

export const connectedAccounts = async (
  gamertag: string,
  platform: platforms | PlatformValues
) => {
  const parsedGamertag = isPcPlayerPlatform(platform)
    ? encodeURIComponent(gamertag)
    : gamertag;
  const parsedPlatform = parseProfilePlatform(platform);
  const lookupType = parseLookupType(platform);
  return getRequest(
    `/crm/cod/v2/accounts/platform/${parsedPlatform}/${lookupType}/${parsedGamertag}`
  );
};

export const settings = async (
  gamertag: string,
  platform: platforms | PlatformValues
) => {
  const parsedGamertag = isPcPlayerPlatform(platform)
    ? encodeURIComponent(gamertag)
    : gamertag;
  const parsedPlatform = parseProfilePlatform(platform);
  return getRequest(
    `/preferences/v1/platform/${parsedPlatform}/gamer/${parsedGamertag}/list`
  );
};

export const friendAction = async (
  gamertag: string,
  platform: platforms,
  action: friendActions
) => {
  const lookupType = parseLookupType(platform);
  const parsedGamertag = isPcPlayerPlatform(platform)
    ? encodeURIComponent(gamertag)
    : gamertag;
  const parsedPlatform = parseProfilePlatform(platform);
  return await postRequest(
    `/codfriends/v1/${action}/${parsedPlatform}/${lookupType}/${parsedGamertag}`,
    {}
  );
};
