import { getRequest, getToken, postRequest } from "./api";
import { friendActions, platforms, PlatformValues } from "./types";
import {
  isPcPlayerPlatform,
  parseLookupType,
  parseProfilePlatform,
} from "./utils";

export async function friendFeed(
  gamertag: string,
  platform: platforms | PlatformValues
) {
  const parsedGamertag = isPcPlayerPlatform(platform)
    ? encodeURIComponent(gamertag)
    : gamertag;
  const parsedPlatform = parseProfilePlatform(platform);
  return getRequest(
    `/userfeed/v1/friendFeed/platform/${parsedPlatform}/gamer/${parsedGamertag}/friendFeedEvents/en`
  );
}

export async function eventFeed() {
  const baseSsoToken = getToken();
  return getRequest(`/userfeed/v1/friendFeed/rendered/en/${baseSsoToken}`);
}

export type Identities = {
  titleIdentities: {
    title: string;
    platform: string;
    username: string;
    activeDate: number;
    activityType: string;
    id: null;
  }[];
};

/**
 * Helper method to search for player profiles tied to sso token
 *
 * @public
 */
export async function loggedInIdentities() {
  const baseSsoToken = getToken();
  return getRequest<Identities>(`/crm/cod/v2/identities/${baseSsoToken}`);
}

export type Points = {
  codPoints: number;
};

/**
 * Helper method to get a player's cod points balance
 * @param gamertag - player's in-game username
 * @param platform - player's platform
 *
 * @public
 */
export async function codPoints(
  gamertag: string,
  platform: platforms | PlatformValues
) {
  const parsedGamertag = isPcPlayerPlatform(platform)
    ? encodeURIComponent(gamertag)
    : gamertag;
  const parsedPlatform = parseProfilePlatform(platform);
  return getRequest<Points>(
    `/inventory/v1/title/mw/platform/${parsedPlatform}/gamer/${parsedGamertag}/currency`
  );
}

export type Accounts = {
  [key in Exclude<PlatformValues, "all" | "steam" | "acti">]: {
    username: string;
  };
};

/**
 * Helper method to get player's connected platform accounts
 * @param gamertag - player's in-game username
 * @param platform - player's platform
 *
 * @public
 */
export async function connectedAccounts(
  gamertag: string,
  platform: platforms | PlatformValues
) {
  const parsedGamertag = isPcPlayerPlatform(platform)
    ? encodeURIComponent(gamertag)
    : gamertag;
  const parsedPlatform = parseProfilePlatform(platform);
  const lookupType = parseLookupType(platform);
  return getRequest<Accounts>(
    `/crm/cod/v2/accounts/platform/${parsedPlatform}/${lookupType}/${parsedGamertag}`
  );
}

export type Settings = {
  [key in Exclude<PlatformValues, "all" | "steam" | "acti">]: {
    [setting: string]: string;
  };
};

/**
 * Helper method to get player's connected platform account's settings.
 * @param gamertag - player's in-game username
 * @param platform - player's platform
 *
 * @public
 */
export async function settings(
  gamertag: string,
  platform: platforms | PlatformValues
) {
  const parsedGamertag = isPcPlayerPlatform(platform)
    ? encodeURIComponent(gamertag)
    : gamertag;
  const parsedPlatform = parseProfilePlatform(platform);
  return getRequest<Settings>(
    `/preferences/v1/platform/${parsedPlatform}/gamer/${parsedGamertag}/list`
  );
}

export async function friendAction(
  gamertag: string,
  platform: platforms,
  action: friendActions
) {
  const lookupType = parseLookupType(platform);
  const parsedGamertag = isPcPlayerPlatform(platform)
    ? encodeURIComponent(gamertag)
    : gamertag;
  const parsedPlatform = parseProfilePlatform(platform);
  return await postRequest(
    `/codfriends/v1/${action}/${parsedPlatform}/${lookupType}/${parsedGamertag}`,
    {}
  );
}
