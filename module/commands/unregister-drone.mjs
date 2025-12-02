/** @import { ChatCommandData, ChatMessageCallback } from "./types" */

import { HEXPROTO } from "../config/config.mjs";
import { getUserByDroneId } from "../config/utils.mjs";

/** @type {ChatCommandData} */
export const unregisterDroneCommand = {
  name: "/h!unregister",
  locName: "unregisterDrone",
  aliases: ["/h!undronify"],
  module: HEXPROTO.MODULE_ID,
  icon: '<img src="icons/svg/light-off.svg" />',
  callback: unregisterCallback,
};

/** @type {ChatMessageCallback} */
async function unregisterCallback(_chat, parameters, _messageData) {
  // Use drone ID
  const regex = /^(?<droneId>\d{4})$/;

  const { droneId } = parameters.trim().match(regex).groups ?? { droneId: "" };

  const user = getUserByDroneId(droneId);

  let message = "";

  if (
    !user ||
    !droneId ||
    user.getFlag(HEXPROTO.MODULE_ID, "droneId") != droneId
  ) {
    message = "HEXPROTO.error.droneIdMismatch";
  } else {
    user.unsetFlag(HEXPROTO.MODULE_ID, "droneId");
    message = "HEXPROTO.cmd.unregisterDrone.commandOutput";
  }

  const output = game.i18n.format(message, { user: user?.name, droneId });

  const content = `<span class="hexproto-output">${output}</span>`;
  const alias = game.i18n.localize("HEXPROTO.chatAlias.hiveAI");
  const flavor = game.i18n.localize("HEXPROTO.cmd.unregisterDrone.name");

  return {
    content,
    speaker: {
      alias,
    },
    flavor,
    whisper: [game.user._id],
  };
}
