import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

type UploadFileCms = {
  id: number;
  alt: string;
  url: string | null;
};

export type ProjectCms = {
  id: string;
  name: string;
  thumbnailImage: UploadFileCms;
  description: string;
  startDate: string;
  endDate: string;
  stack: { tech: string }[];
};

export type BlogCms = {
  title: string;
  slug: string;
  category: string;
  publishedDate: string;
  content: SerializedEditorState;
  project: ProjectCms | null;
};

export type SocialIconType =
  | "github"
  | "linkedin"
  | "x"
  | "instagram"
  | "whatsapp";

export type HomePageProjectCms = Pick<
  ProjectCms,
  "id" | "name" | "thumbnailImage" | "description" | "startDate" | "endDate"
>;

export type HomePageBlogCms = Pick<
  BlogCms,
  "title" | "slug" | "category" | "publishedDate"
>;

export const socialIconNames: Record<SocialIconType, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  x: "X/Twitter",
  instagram: "Instagram",
  whatsapp: "WhatsApp",
};

export type HomepageCms = {
  Header: {
    title: string;
    subTitle: string;
    avatar: UploadFileCms;
    description: Record<string, unknown>;
    socials: {
      icon: SocialIconType;
      url: string;
      id: string;
    }[];
  };
  projects: HomePageProjectCms[];
  blogs: HomePageBlogCms[];
  resume: UploadFileCms;
};
