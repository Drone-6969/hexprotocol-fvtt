/** @import { ChatCommand, ChatCommands } from "./_types" */
import { registerDroneCommand } from "./commands/register-drone.mjs";
import { sendMessageCommand } from "./commands/send-message.mjs";
import { unregisterDroneCommand } from "./commands/unregister-drone.mjs";

/** @type {ChatCommand[]} */
const protocolCommands = [
  registerDroneCommand,
  unregisterDroneCommand,
  sendMessageCommand,
];

/**
 * @param {ChatCommands} commands
 */
export function onChatCommandsReady(commands) {
  protocolCommands.forEach((cmd) => {
    if (!cmd.description) {
      cmd.description = game.i18n.localize(`HEXPROTO.cmd.${cmd.locName}.desc`);
    }
    commands.register(cmd);
  });
}
