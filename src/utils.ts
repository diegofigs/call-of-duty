import { PlatformValues, platforms } from "./types";

type PcPlayerPlatform = Extract<PlatformValues, "battle" | "acti" | "uno">;
export const isPcPlayerPlatform = (
  platform: platforms | PlatformValues
): platform is PcPlayerPlatform => {
  return (
    platform === platforms.Battlenet ||
    platform === platforms.Activision ||
    platform === platforms.Uno
  );
};

export const parsePlayer = (
  gamertag: string,
  platform: platforms | PlatformValues
) => {
  const parsedPlatform = parsePlayerPlatform(platform);
  const lookupType = parseLookupType(platform);
  const parsedGamertag = isPcPlayerPlatform(platform)
    ? encodeURIComponent(gamertag)
    : gamertag;

  return { lookupType, parsedGamertag, parsedPlatform };
};

export const parsePlayerPlatform = (platform: platforms | PlatformValues) => {
  if (platform === platforms.Steam)
    throw new Error("Steam doesn't exist for target game. Try `battle` instead.");

  return platform === platforms.Activision ? platforms.Uno : platform;
};

export const parseProfilePlatform = (platform: platforms | PlatformValues) => {
  return platform === platforms.Activision ? platforms.Uno : platform;
}

export const parseLookupType = (platform: platforms | PlatformValues) => {
  return platform === platforms.Uno ? "id" : "gamer";
}
