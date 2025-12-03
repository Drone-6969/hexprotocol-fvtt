const { ChatMessage } = foundry.documents;

interface ChatPortraitCustomData {
  customIconPortraitImage?: string;
  customImageReplacerData?: { name: string; icon: string }[];
}

export type ReplaceChatPortraitCallback = (
  chatPortraitCustomData: ChatPortraitCustomData,
  chatMessage: ChatMessage,
) => ChatPortraitCustomData;
