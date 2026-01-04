/** @import { ChatCommand, ChatCommands } from "./_types" */
import { aiMessageCommand } from "./commands/ai-message.mjs";
import { narrateCommand } from "./commands/narrate.mjs";
import { registerDroneCommand } from "./commands/register-drone.mjs";
import { sendMessageAsCommand } from "./commands/send-message-as.mjs";
import { sendMessageCommand } from "./commands/send-message.mjs";
import { unregisterDroneCommand } from "./commands/unregister-drone.mjs";

/** @type {ChatCommand[]} */
const protocolCommands = [
  registerDroneCommand,
  unregisterDroneCommand,
  sendMessageCommand,
  sendMessageAsCommand,
  narrateCommand,
  aiMessageCommand,
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
