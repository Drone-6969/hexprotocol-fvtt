import type { MaybePromise } from "../global";
type ChatLog = foundry.applications.sidebar.tabs.ChatLog;
type ChatMessageData = foundry.documents.types.ChatMessageData;

export interface ChatCommand {
  // e.g. "/hx!format"
  name: string;
  /** Appended to localization string. My own addition @todo document this better*/
  locName: string;
  // Should always be the module ID!
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
  callback?: ChatMessageCallback;

  autocompleteCallback?: ChatMessageAutocompleteCallback;
  closeOnComplete?: boolean;
}
export interface ChatCommands {
  register: (data: ChatCommand) => MaybePromise<void>;
}

export type ChatMessageCallback = (
  chat: ChatLog,
  parameters: string,
  messageData: ChatMessageData,
) => MaybePromise<ChatMessageData>;

export interface AutocompleteMenu {
  maxEntries: number;
  showFooter: boolean;
  currentCommand: ChatCommand;
  // The below are marked private in the jsdoc, but `visible` is used in an example
  visible: boolean;
  container: HTMLElement;
  chatInput: HTMLTextAreaElement;
  suggestionArea: HTMLTextAreaElement;
}

export type ChatMessageAutocompleteCallback = (
  menu: AutocompleteMenu,
  alias: string,
  parameters: string,
) => MaybePromise<ChatMessageData>;
