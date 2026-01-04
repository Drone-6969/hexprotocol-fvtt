/** @import { ChatCommand, ChatMessageCallback } from "../_types" */

import { HEXPROTO } from "../config.mjs";

/** @type {ChatCommand} */
export const aiMessageCommand = {
  name: "/h!ai",
  locName: "aiMessage",
  aliases: ["/s"],
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

  const message = parameters.trim();
  const content = `<div class="hexproto-output">${message}</div>`;
  const alias = game.i18n.localize("HEXPROTO.chatAlias.mainframeAI");
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
