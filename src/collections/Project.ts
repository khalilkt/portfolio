import { CollectionConfig } from "payload";

export const Project: CollectionConfig = {
  slug: "project",
  admin: {
    useAsTitle: "name",
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
  ],
};
