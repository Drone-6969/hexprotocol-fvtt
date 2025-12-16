/** @import { ChatCommand, ChatMessageCallback } from "../_types" */

import { HEXPROTO } from "../config.mjs";

/** @type {ChatCommand} */
export const sendMessageCommand = {
  name: "/h!send",
  locName: "sendMessage",
  aliases: ["/d", "/h"],
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

  // Gets a 3-digit message ID and content
  const regex = /^((?<msgCode>\d{3})\s?)(?<msgContent>.*)$/;

  const { msgCode, msgContent } = parameters.trim().match(regex).groups;

  const whisper = [];
  let message = "";

  if (!(msgCode in HEXPROTO.protocolCodes)) {
    message = "HEXPROTO.error.invalidMessageCode";
    whisper.push(game.user._id);
  } else {
    message = "HEXPROTO.protocol.messageTemplate";
  }

  let protocolOutput = game.i18n.format(message, {
    droneId,
    msgCode,
    protocolMessage: game.i18n.localize(
      `HEXPROTO.protocol.protocolMessage.${msgCode}`,
    ),
  });

  if (msgContent) {
    if (HEXPROTO.protocolContentCodes.includes(msgCode)) {
      protocolOutput += ` :: ${msgContent}`;
    } else if (HEXPROTO.protocolAddressCodes.includes(msgCode)) {
      protocolOutput += ` ${msgContent}`;
    }
  }

  const content = `<span class="hexproto-output">${protocolOutput}</span>`;
  const alias = game.i18n.localize("HEXPROTO.chatAlias.transmission");

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
