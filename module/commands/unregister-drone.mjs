/** @import { ChatLog } from "@client/applications/sidebar/tabs" */
/** @import { ChatCommandData } from "./types" */

import { HEXPROTO } from "../config/config.mjs";

/** @type {ChatCommandData} */
export const unregisterDroneCommand = {
  name: "/h!unregister",
  aliases: ["/h!undronify"],
  module: HEXPROTO.MODULE_ID,
  icon: '<img src="icons/svg/light-off.svg" />',
  callback: unregisterCallback,
};

async function unregisterCallback(chat, parameters, messageData) {
  // Use drone ID
}
