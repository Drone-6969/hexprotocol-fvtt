import { HEXPROTO } from "./protocol/config.mjs";
import { onChatCommandsReady } from "./protocol/init.mjs";
import { replaceChatPortrait } from "./api/chat-portrait.mjs";

const { Hooks } = foundry.helpers;

Hooks.once("init", () => {
  CONFIG.HEXPROTO = HEXPROTO;

  Hooks.on("chatCommandsReady", onChatCommandsReady);

  // Hook into the Chat Portrait module if present
  if (game.modules.keys().some((key) => key === "chat-portrait")) {
    Hooks.on("ChatPortraitReplaceData", replaceChatPortrait);
  }
});
