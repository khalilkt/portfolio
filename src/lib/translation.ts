export const translationKeysList: string[] = [
  "book_call_cta",
  "lets_chat_cta",
  "writing",
  "back_to_top_cta",
  "follow_me_on",
  "published",
  "writings",
  "writings_description",
];

export type TranslationKey = (typeof translationKeysList)[number];

export type TObject = {
  [K in TranslationKey]: string;
};
