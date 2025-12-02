import type { MaybePromise } from "../utils";
import ChatLog = foundry.applications.sidebar.tabs.ChatLog;
import ChatMessageData = foundry.documents.types.ChatMessageData;

export interface ChatCommandData {
  // e.g. "/hx!format"
  name: string;
  // Appended to localization string
  locName: string;
  // Should always be the module ID! i.e. "hexprotocol"
  module: "hexprotocol";
  // e.g. ["/d", "/frm"]
  aliases?: string[];
  // <= 80 chars, not automatically localized
  /** @todo Confirm this */
  description?: string;
  // e.g. `<i class="fas fa-dice-d20"></i>`
  icon?: string;
  requiredRole?: keyof typeof CONST.USER_ROLES;
  // callback
  callback?: (
    chat: ChatLog,
    parameters: string,
    messageData: ChatMessageData,
  ) => MaybePromise<ChatMessageData>;

  autocompleteCallback?: (
    /** @todo Inspect this in the console */
    menu: unknown,
    // Alias used to invoke command
    alias: string,
    // Everything after 1st space or single char alias
    parameters: string,
  ) => MaybePromise<unknown[]>;
  closeOnComplete?: boolean;
}
export interface ChatCommanderObject {
  register: (data: ChatCommandData) => MaybePromise<void>;
}

export type ChatMessageCallback = (
  chat: ChatLog,
  parameters: string,
  messageData: ChatMessageData,
) => MaybePromise<ChatMessageData>;
