import { getBlogData, getHomePageData, getLabelAssets } from "@/lib/cms/cms";
import parseDate from "@/lib/utils";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { notFound } from "next/navigation";
import { blogConverter } from "./blog_converter";
import { TObject } from "@/lib/translation";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const blog = await getBlogData(slug);
  const t = await getLabelAssets();

  if (!blog) {
    notFound();
  }

  return (
    <div className="">
      <p className="text-[#3687FF] text-sm font-medium ">
        {t.published + " "} {parseDate(blog.publishedDate)}
      </p>
      <h1 className="text-[32px] leading-10.5 mt-4">{blog.title}</h1>
      <RichText data={blog.content} converters={blogConverter} />
    </div>
  );
}
