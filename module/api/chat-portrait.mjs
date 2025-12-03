/** @import { ReplaceChatPortraitCallback } from "./_types" */

/** @type {ReplaceChatPortraitCallback} */
export function replaceChatPortrait(chatPortraitCustomData, chatMessage) {
  const icon = chatMessage.getFlag(CONFIG.HEXPROTO.MODULE_ID, "icon");

  if (icon) {
    chatPortraitCustomData.customIconPortraitImage = `modules/hexprotocol/img/${icon}-chat-icon.webp`;
  }

  return chatPortraitCustomData;
}
