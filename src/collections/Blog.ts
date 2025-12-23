import { CollectionConfig } from "payload";

export const Blog: CollectionConfig = {
  slug: "blog",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },

    {
      name: "content",
      type: "richText",
      required: true,
      admin: {},
    },

    {
      name: "category",
      type: "text",
      required: true,
    },
    {
      name: "publishedDate",
      label: "Published Date",
      type: "date",
      required: true,
    },
    {
      name: "tags",
      type: "array",
      fields: [{ name: "tag", type: "text" }],
    },
    {
      name: "project",
      type: "relationship",
      relationTo: "project",
    },
  ],
};
