import { CollectionConfig } from "payload";

const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export const Project: CollectionConfig = {
  slug: "project",
  admin: {
    useAsTitle: "name",
  },
  hooks: {
    beforeValidate: [
      async ({ data }) => {
        if (!data) return data;
        if (data.name && !data.slug) {
          data.slug = generateSlug(data.name);
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "startDate",
      type: "date",
      required: true,
    },
    {
      name: "endDate",
      type: "date",
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "thumbnailImage",
      label: "Thumbnail Image",
      type: "upload",
      required: true,
      relationTo: "media",
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      admin: {
        placeholder: "auto-generated-from-name",
        readOnly: true,
      },
    },
    {
      name: "stack",
      type: "array",
      label: "Tech Stack",
      minRows: 0,
      maxRows: 20,
      fields: [
        {
          name: "tech",
          type: "text",
        },
      ],
    },
  ],
};
