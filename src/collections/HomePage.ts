import { GlobalConfig } from "payload";

export const HomePage: GlobalConfig = {
  slug: "HomePage",
  fields: [
    {
      name: "Header",
      type: "group",
      fields: [
        {
          name: "avatar",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "title",
          type: "text",
          label: "Title",
        },
        {
          name: "subTitle",
          type: "text",
          label: "Sub Title",
        },
        {
          name: "description",
          label: "Description",
          type: "richText",
        },
        {
          name: "socials",
          label: "Socials",
          type: "array",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "icon",
                  type: "select",
                  options: [
                    { label: "GitHub", value: "github" },
                    { label: "LinkedIn", value: "linkedin" },
                    { label: "Twitter / X", value: "x" },
                    { label: "Instagram", value: "instagram" },
                    { label: "Whatsapp", value: "whatsapp" },
                  ],
                  required: true,
                },
                {
                  name: "url",
                  type: "text",
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "projects",
      label: "Featured Projects",
      type: "relationship",
      relationTo: "project",
      hasMany: true,
    },
    {
      name: "blogs",
      label: "Featured blogs",
      type: "relationship",
      relationTo: "blog",
      hasMany: true,
    },
    // add field where I can upload a resume file
    {
      name: "resume",
      label: "Resume",
      type: "upload",
      relationTo: "media",
    },
  ],
};
