import { HEXPROTO } from "./config.mjs";

/** @type {(droneId: string) => foundry.documents.User | undefined} */
export function getUserByDroneId(droneId) {
  return game.users.find(
    (user) => user.getFlag(HEXPROTO.MODULE_ID, "droneId") === droneId,
  );
}
