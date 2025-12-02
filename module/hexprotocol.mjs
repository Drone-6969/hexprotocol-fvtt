/** @import { ChatCommandData, ChatCommanderObject } from "./commands/types" */

import { replaceChatPortrait } from "./api/chat-portrait.mjs";
import { registerDroneCommand } from "./commands/register-drone.mjs";
import { sendMessageCommand } from "./commands/send-message.mjs";
import { unregisterDroneCommand } from "./commands/unregister-drone.mjs";

const { Hooks } = foundry.helpers;

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

Hooks.once("init", () => {
  Hooks.on("chatCommandsReady", onChatCommandsReady);
  if (game.modules.keys().some((key) => key === "chat-portrait")) {
    Hooks.on("ChatPortraitReplaceData", replaceChatPortrait);
  }
});
