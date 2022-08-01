/**
 * Main entry point: exports a module per game and
 * a couple of helpers to interact with a player's
 * profile. Before calling any method, make sure to define
 * an env var `COD_SSO_TOKEN` or call {@link !login}.
 * 
 * @example
 * ```bash
 * COD_SSO_TOKEN="<INSERT-SSO-TOKEN-HERE>" npm start
 * ```
 * or
 * ```ts
 * import { login } from "@diegofigs/call-of-duty";
 * login("<INSERT-SSO-TOKEN-HERE>");
 * ```
 * 
 * @module 
 */
export * as Warzone from "./wz";
export * as ModernWarfare from "./mw";
export * as ColdWar from "./cw";
export * as Vanguard from "./vg";
export * as Me from "./user";
export * as Store from "./store";
export * as Misc from "./misc";
export * from "./types";
export { login } from "./api";
