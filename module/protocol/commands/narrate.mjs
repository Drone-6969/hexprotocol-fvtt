/** @import { ChatCommand, ChatMessageCallback } from "../_types" */

import { HEXPROTO } from "../config.mjs";

/** @type {ChatCommand} */
export const narrateCommand = {
  name: "/h!narrate",
  locName: "narrate",
  aliases: ["/n"],
  module: HEXPROTO.MODULE_ID,
  icon: '<img src="icons/svg/sound.svg" />',
  callback,
};

/** @type {ChatMessageCallback} */
function callback(chat, parameters, _messageData) {
  const droneId = game.user.getFlag(HEXPROTO.MODULE_ID, "droneId");
  if (!droneId) {
    const errMsg = game.i18n.localize("HEXPROTO.error.notADrone");
    foundry.ui.notifications.error(errMsg);
    return;
  }

  if (!game.user.isGM) {
    const msg = game.i18n.localize("HEXPROTO.error.adminOnly");
    foundry.ui.notifications.warn(msg);
    return;
  }

  const narration = parameters.trim();

  const content = `<span class="hexproto-output">${narration}</span>`;
  const alias = game.i18n.localize("HEXPROTO.chatAlias.narration");

  const icon = "mainframe";

  return {
    content,
    speaker: {
      alias,
    },
    flags: {
      hexprotocol: {
        icon,
      },
    },
  };
}
