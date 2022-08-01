import { getRequest } from "./api";
import {
  platforms,
  MatchIndex,
  FullData,
  CombatHistory,
  PlatformValues,
  MatchInfo,
} from "./types";
import { parsePlayer, parsePlayerPlatform } from "./utils";

/**
 * Returns summarized profile of a player.
 *
 * @param gamertag - player's in-game username
 * @param platform - player's platform
 *
 * @public
 */
export async function fullData(
  gamertag: string,
  platform: platforms | PlatformValues
) {
  const { lookupType, parsedGamertag, parsedPlatform } = parsePlayer(
    gamertag,
    platform
  );
  return getRequest<FullData>(
    `/stats/cod/v1/title/mw/platform/${parsedPlatform}/${lookupType}/${parsedGamertag}/profile/type/wz`
  );
}

/**
 * Returns stats on a per-mode basis and last 20
 * matches of a player.
 *
 * @param gamertag - player's in-game username
 * @param platform - player's platform
 * @param startTime - optional lower bound to delimit data by, default: `0`
 * @param endTime - optional upper bound to delimit data by, default: `0`
 *
 * @public
 */
export async function combatHistory(
  gamertag: string,
  platform: platforms | PlatformValues,
  startTime = 0,
  endTime = 0
) {
  const { lookupType, parsedGamertag, parsedPlatform } = parsePlayer(
    gamertag,
    platform
  );
  return getRequest<CombatHistory>(
    `/crm/cod/v2/title/mw/platform/${parsedPlatform}/${lookupType}/${parsedGamertag}/matches/wz/start/${startTime}/end/${endTime}/details`
  );
}

/**
 * Returns stats on a per-mode basis and last 20
 * matches of a player.
 *
 * @param gamertag - player's in-game username
 * @param platform - player's platform
 * @param startTime - lower bound to delimit data by
 * @param endTime - upper bound to delimit data by
 *
 * @public
 */
export async function combatHistoryWithDate(
  gamertag: string,
  startTime: number,
  endTime: number,
  platform: platforms | PlatformValues
) {
  return combatHistory(gamertag, platform, startTime, endTime);
}

/**
 * Returns list of match indices from a player.
 *
 * @param gamertag - player's in-game username
 * @param platform - player's platform
 * @param startTime - optional lower bound to delimit data by, default: `0`
 * @param endTime - optional upper bound to delimit data by, default: `0`
 *
 * @public
 */
export async function breakdown(
  gamertag: string,
  platform: platforms | PlatformValues,
  startTime = 0,
  endTime = 0
) {
  const { lookupType, parsedGamertag, parsedPlatform } = parsePlayer(
    gamertag,
    platform
  );
  return getRequest<MatchIndex[]>(
    `/crm/cod/v2/title/mw/platform/${parsedPlatform}/${lookupType}/${parsedGamertag}/matches/wz/start/${startTime}/end/${endTime}`
  );
}

/**
 * Returns list of match indices from a player.
 *
 * @param gamertag - player's in-game username
 * @param platform - player's platform
 * @param startTime - lower bound to delimit data by
 * @param endTime - upper bound to delimit data by
 *
 * @public
 */
export async function breakdownWithDate(
  gamertag: string,
  startTime: number,
  endTime: number,
  platform: platforms | PlatformValues
) {
  return breakdown(gamertag, platform, startTime, endTime);
}

/**
 * Returns match data from a per-player basis, where
 * a every player has a username, clantag, team, loadout
 * and awards attributed.
 *
 * @param matchId - unique id of match
 * @param platform - platform where match took place
 *
 * @public
 */
export async function matchInfo(
  matchId: string,
  platform: platforms | PlatformValues
) {
  const parsedPlatform = parsePlayerPlatform(platform);
  return getRequest<MatchInfo>(
    `/crm/cod/v2/title/mw/platform/${parsedPlatform}/fullMatch/wz/${matchId}/en`
  );
}
