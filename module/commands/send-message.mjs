/** @import { ChatCommandData, ChatMessageCallback } from "./types" */

import { HEXPROTO } from "../config/config.mjs";

/** @type {ChatCommandData} */
export const sendMessageCommand = {
  name: "/h!send",
  aliases: ["/d", "/h"],
  module: HEXPROTO.MODULE_ID,
  icon: '<img src="icons/svg/sound.svg" />',
  callback: sendMessageCallback,
};

/** @type {ChatMessageCallback} */
function sendMessageCallback(chat, parameters, _messageData) {
  const droneId = game.user.getFlag(HEXPROTO.MODULE_ID, "droneId");
  if (!droneId) {
    const errMsg = game.i18n.localize("HEXPROTO.error.notADrone");
    foundry.ui.notifications.warn(errMsg);
    return;
  }

  // Gets a 3-digit message ID and content
  const regex = /^(?<msgCode>\d{3})\s(?<msgContent>.*)$/;

  const { msgCode, msgContent } = parameters.match(regex).groups;

  if (!msgCode) {
    const errMsg = game.i18n.localize("HEXPROTO.error.noMessageCode");
    foundry.ui.notifications.warn(errMsg);
    return;
  }

  const isContentCode = msgCode in HEXPROTO.protocolContentCodes;

  const protocolOutput = game.i18n.format("HEXPROTO.protocol.messageTemplate", {
    droneId,
    msgCode,
    protocolMessage: game.i18n.localize(
      `HEXPROTO.protocol.protocolMessage.${msgCode}`,
    ),
  });

  const extraContent = msgContent && isContentCode ? ` :: ${msgContent}` : "";

  const alias = game.i18n.format("HEXPROTO.chatAlias.drone", { droneId });

  const content = `<span class="hexproto-output">${protocolOutput}${extraContent}</span>`;

  return {
    content,
    speaker: {
      alias,
    },
  };
}
