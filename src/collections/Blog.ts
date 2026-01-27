import { CollectionConfig } from "payload";

export const Blog: CollectionConfig = {
  slug: "blog",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: (): boolean => true,
    create: (): boolean => true,
    update: (): boolean => true,
    delete: (): boolean => true,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.title) {
          data.slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
        }
        return data;
      },
    ],
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

      unique: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: "status",
      type: "select",
      options: [
        {
          label: "Draft",
          value: "draft",
        },
        {
          label: "Published",
          value: "published",
        },
      ],
      defaultValue: "draft",
      required: true,
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
