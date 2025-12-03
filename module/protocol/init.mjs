/** @import { ChatCommandData, ChatCommanderObject } from "./_types" */
import { registerDroneCommand } from "./protocol/commands/register-drone.mjs";
import { sendMessageCommand } from "./protocol/send-message.mjs";
import { unregisterDroneCommand } from "./protocol/commands/unregister-drone.mjs";

/** @type {ChatCommandData[]} */
const chatCommands = [
  registerDroneCommand,
  unregisterDroneCommand,
  sendMessageCommand,
];

/**
 * @param {ChatCommanderObject} commands
 */
export function onChatCommandsReady(commands) {
  chatCommands.forEach((cmd) => {
    if (!cmd.description) {
      cmd.description = game.i18n.localize(`HEXPROTO.cmd.${cmd.locName}.desc`);
    }
    commands.register(cmd);
  });
}
