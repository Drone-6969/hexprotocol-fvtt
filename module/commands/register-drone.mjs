/** @import { ChatCommandData, ChatMessageCallback } from "./types" */

import { HEXPROTO } from "../config/config.mjs";
import { getUserByDroneId } from "../config/utils.mjs";

/** @type {ChatCommandData} */
export const registerDroneCommand = {
  name: "/h!register",
  locName: "registerDrone",
  aliases: ["/h!dronify"],
  module: HEXPROTO.MODULE_ID,
  icon: '<img src="icons/svg/sun.svg" />',
  callback: registerDroneCallback,
};

/** @type {ChatMessageCallback} */
async function registerDroneCallback(_chat, parameters, _messageData) {
  // Get name w/ game.users.getName
  const regex = /^(?<uname>.*)\s+(?<droneId>\d{4})$/;

  const { uname, droneId } = parameters.match(regex)?.groups ?? {
    uname: "",
    droneId: "",
  };

  const user = game.users.getName(uname.trim());

  let message = "";

  if (!(user && droneId)) {
    message = "HEXPROTO.error.invalidRegistration";
  } else if (user.getFlag(HEXPROTO.MODULE_ID, "droneId")) {
    message = "HEXPROTO.error.alreadyADrone";
  } else if (getUserByDroneId(droneId) != undefined) {
    message = "HEXPROTO.error.idAlreadyAssigned";
  } else {
    user.setFlag(HEXPROTO.MODULE_ID, "droneId", droneId);
    message = "HEXPROTO.cmd.registerDrone.commandOutput";
  }

  const output = game.i18n.format(message, { user: user?.name, droneId });

  const content = `<span class="hexproto-output">${output}</span>`;
  const alias = game.i18n.localize("HEXPROTO.chatAlias.mainframeAI");
  const flavor = game.i18n.localize("HEXPROTO.cmd.registerDrone.name");

  return {
    content,
    speaker: {
      alias,
    },
    flags: {
      hexprotocol: {
        icon: "mainframe",
      },
    },
    flavor,
    whisper: [game.user._id],
  };
}
