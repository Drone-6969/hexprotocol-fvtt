/** @import { ChatLog } from "@client/applications/sidebar/tabs" */
/** @import { ChatCommandData } from "./types" */

import { HEXPROTO } from "../config/config.mjs";

/** @type {ChatCommandData} */
export const registerDroneCommand = {
  name: "/h!register",
  aliases: ["/h!dronify"],
  module: HEXPROTO.MODULE_ID,
  icon: '<img src="icons/svg/sun.svg" />',
  callback: registerCallback,
};

async function registerCallback(chat, parameters, messageData) {
  // Get name w/ game.users.getName
  const regex = /^(?<username>.*)\s+(?<droneId>\d{4})$/;
}
