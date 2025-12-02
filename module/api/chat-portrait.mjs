/** @import { ReplaceChatPortraitCallback } from "./types" */

import { HEXPROTO } from "../config/config.mjs";

const CHAT_PORTRAIT_PATHS = {
  drone: "modules/hexprotocol/img/drone_avatar.png",
  ai: "modules/hexprotocol/img/hive_mainframe.Avatar.webp",
};

/** @type {ReplaceChatPortraitCallback} */
export function replaceChatPortrait(chatPortraitCustomData, chatMessage) {
  const icon = chatMessage.getFlag(HEXPROTO.MODULE_ID, "icon");

  if (icon) {
    chatPortraitCustomData.customIconPortraitImage = `modules/hexprotocol/img/${icon}-chat-icon.webp`;
  }

  return chatPortraitCustomData;
}
