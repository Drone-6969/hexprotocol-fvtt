/** @import { ChatCommandData, ChatCommanderObject } from "./commands/types" */

import { registerDroneCommand } from "./commands/register-drone.mjs";
import { sendMessageCommand } from "./commands/send-message.mjs";
import { unregisterDroneCommand } from "./commands/unregister-drone.mjs";

/** @type {ChatCommandData[]} */
const chatCommands = [
  registerDroneCommand,
  unregisterDroneCommand,
  sendMessageCommand,
];

/**
 * @param {ChatCommanderObject} commands
 */
function onChatCommandsReady(commands) {
  chatCommands.forEach((cmd) => {
    if (!cmd.description) {
      cmd.description = game.i18n.localize(`HEXPROTO.cmd.${cmd.locName}.desc`);
    }
    commands.register(cmd);
  });
}

foundry.helpers.Hooks.on("chatCommandsReady", onChatCommandsReady);
