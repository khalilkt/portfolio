import { translationKeysList } from "@/lib/translation";
import type { CollectionConfig } from "payload";

function toLabel(str: string): string {
  return str
    .replace(/_/g, " ") // replace underscores with spaces
    .replace(/\b\w/g, (c) => c.toUpperCase()) // capitalize first letter of each word
    .replace(/\b[A-Z]{2,}\b/g, (match) => match.toLowerCase()); // optional: lowercase acronyms
}

export const TextAssets: CollectionConfig = {
  slug: "text_assets",
  access: {
    read: (): boolean => true,
    create: (): boolean => true,
    update: (): boolean => true,
    delete: (): boolean => true,
  },
  fields: translationKeysList.map((e) => {
    return {
      name: e,
      label: toLabel(e),
      type: "text",
    };
  }),
};
