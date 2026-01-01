/** @import { ChatCommand, ChatMessageCallback } from "../_types" */

import { HEXPROTO } from "../config.mjs";

/** @type {ChatCommand} */
export const sendMessageAsCommand = {
  name: "/h!as",
  locName: "sendMessageAs",
  aliases: ["/a"],
  module: HEXPROTO.MODULE_ID,
  icon: '<img src="icons/svg/sound.svg" />',
  callback,
};

/** @type {ChatMessageCallback} */
function callback(chat, parameters, _messageData) {
  let message = "";
  const whisper = [];

  const regex = /^(?<droneId>\d{4})\s+(?<msgCode>\d{3})\s+(?<msgContent>.*)$/;

  const { droneId, msgCode, msgContent } = parameters
    .trim()
    .match(regex).groups;

  if (!game.user.isGM) {
    message = "HEXPROTO.error.adminOnly";
    whisper.push(game.user.id);
  } else if (!droneId || !(msgCode in HEXPROTO.protocolCodes)) {
    message = "HEXPROTO.error.invalidSendAs";
    whisper.push(game.user.id);
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
    whisper,
    flags: {
      hexprotocol: {
        icon,
      },
    },
  };
}
