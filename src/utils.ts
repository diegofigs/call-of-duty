import { platforms } from "./types";

export const isConsolePlatform = (platform: platforms) => {
  return (
    platform === platforms.PSN ||
    platform === platforms.XBOX ||
    platform === platforms.All
  );
};

export const parsePlayer = (
  gamertag: string,
  platform: platforms
) => {
  if (platform === platforms.Steam)
    throw new Error("Steam Doesn't exist for MW. Try `battle` instead.");

  const lookupType = platform === platforms.Uno ? "id" : "gamer";
  const parsedGamertag = isConsolePlatform(platform)
    ? gamertag
    : encodeURIComponent(gamertag);
  const parsedPlatform =
    platform === platforms.Activision ? platforms.Uno : platform;
  return { lookupType, parsedGamertag, parsedPlatform };
};
