/** @import { ChatLog } from "@client/applications/sidebar/tabs" */
/** @import { ChatCommandData, ChatMessageCallback } from "./types" */

import { HEXPROTO } from "../config/config.mjs";

/** @type {ChatCommandData} */
export const registerDroneCommand = {
  name: "/h!register",
  aliases: ["/h!dronify"],
  module: HEXPROTO.MODULE_ID,
  icon: '<img src="icons/svg/sun.svg" />',
  callback: registerCallback,
};

/** @type {ChatMessageCallback} */
async function registerCallback(chat, parameters, _messageData) {
  // Get name w/ game.users.getName
  const regex = /^(?<uname>.*)\s+(?<droneId>\d{4})$/;

  const { uname, droneId } = parameters.match(regex).groups;

  const username = uname.trim();

  if (!(username && droneId)) {
    const errMsg = game.i18n.localize("HEXPROTO.error.invalidRegistration");
    foundry.ui.notifications.warn(errMsg);
    return;
  }

  
}
