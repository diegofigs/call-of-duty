import { PlatformValues, platforms } from "./types";

type ConsolePlatform = Extract<PlatformValues, "psn" | "xbl" | "all">;
export const isConsolePlatform = (
  platform: platforms | PlatformValues
): platform is ConsolePlatform => {
  return (
    platform === platforms.PSN ||
    platform === platforms.XBOX ||
    platform === platforms.All
  );
};

export const parsePlayer = (
  gamertag: string,
  platform: platforms | PlatformValues
) => {
  const parsedPlatform = parsePlayerPlatform(platform);
  const lookupType = platform === platforms.Uno ? "id" : "gamer";
  const parsedGamertag = isConsolePlatform(platform)
    ? gamertag
    : encodeURIComponent(gamertag);

  return { lookupType, parsedGamertag, parsedPlatform };
};

export const parsePlayerPlatform = (platform: platforms | PlatformValues) => {
  if (platform === platforms.Steam)
    throw new Error("Steam Doesn't exist for MW. Try `battle` instead.");

  return platform === platforms.Activision ? platforms.Uno : platform;
};
