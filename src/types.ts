export const enum platforms {
  All = "all",
  Activision = "acti",
  Battlenet = "battle",
  PSN = "psn",
  Steam = "steam",
  Uno = "uno",
  XBOX = "xbl",
}

export enum friendActions {
  Invite = "invite",
  Uninvite = "uninvite",
  Remove = "remove",
  Block = "block",
  Unblock = "unblock",
}

export type PlatformValues =
  | "all"
  | "acti"
  | "battle"
  | "psn"
  | "steam"
  | "uno"
  | "xbl";

export type MatchPlayerStats = {
  kills: number;
  medalXp: number;
  matchXp: number;
  scoreXp: number;
  wallBangs: number;
  score: number;
  totalXp: number;
  headshots: number;
  assists: number;
  challengeXp: number;
  rank: number;
  scorePerMinute: number;
  distanceTraveled: number;
  teamSurvivalTime: number;
  deaths: number;
  kdRatio: number;
  bonusXp: number;
  gulagDeaths: number;
  timePlayed: number;
  executions: number;
  gulagKills: number;
  nearmisses: number;
  percentTimeMoving: number;
  miscXp: number;
  longestStreak: number;
  teamPlacement: number;
  damageDone: number;
  damageTaken: number;
};

export type MatchPlayer = {
  team: string;
  rank: number;
  awards: any;
  username: string;
  uno: string;
  clantag: string;
  loadouts: Array<any>[];
  brMissionStats: any[];
  loadout: Array<any>[];
};

export type Match = {
  utcStartSeconds: number;
  utcEndSeconds: number;
  map: string;
  mode: string;
  matchID: string;
  duration: number;
  playlistName: any;
  version: number;
  gameType: string;
  playerCount: number;
  playerStats: MatchPlayerStats;
  player: MatchPlayer;
  teamCount: number;
  rankedTeams: any;
  draw: boolean;
  privateMatch: boolean;
};

export type ModeStats = {
  kills: number;
  kdRatio: number;
  wallBangs: number;
  avgLifeTime: number;
  gulagDeaths: number;
  score: number;
  timePlayed: number;
  headshotPercentage: number;
  headshots: number;
  executions: number;
  matchesPlayed: number;
  assists: number;
  gulagKills: number;
  nearmisses: number;
  killsPerGame: number;
  scorePerMinute: number;
  distanceTraveled: number;
  damageDone: number;
  deaths: number;
  damageTaken: number;
};

export type MatchIndex = {
  platform: platforms;
  title: string;
  timestamp: number;
  type: string;
  matchId: string;
  map: string;
};

export type FullData = {
  title: string;
  platform: platforms;
  username: string;
  type: string;
  level: number;
  maxLevel: number;
  levelXpRemainder: number;
  levelXpGained: number;
  prestige: number;
  prestigeId: number;
  maxPrestige: number;
  totalXp: number;
  paragonRank: number;
  paragonId: number;
  s: number;
  p: number;
  lifetime: {
    all: {
      properties: {
        [property: string]: number;
      };
    };
    mode: { [key: string]: any };
    map: any;
    itemData: { [key: string]: any };
    scorestreakData: { [key: string]: any };
    accoladeData: { [key: string]: any };
  };
  weekly: {
    all: {
      properties: {
        [property: string]: number;
      };
    };
    mode: any;
    map: any;
  };
  engagement: any;
};

export type CombatHistory = {
  summary: {
    [key: string]: ModeStats;
  };
  matches: Match[];
};
