import { getBlogData, getHomePageData, getLabelAssets } from "@/lib/cms/cms";
import parseDate from "@/lib/utils";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { notFound } from "next/navigation";
import { blogConverter } from "./blog_converter";
import { BlogProvider } from "@/app/components/BlogProvider";
import Image from "next/image";

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
    <BlogProvider>
      <div className="">
        {!blog.project && (
          <p className="text-[#3687FF] text-sm font-medium ">
            {t.published + " "} {parseDate(blog.publishedDate)}
          </p>
        )}
        {blog.project && (
          <>
            <div className="bg-gray-200 p-8 rounded">
              <Image
                src={blog.project.thumbnailImage.url!}
                alt={blog.project.thumbnailImage.alt}
                height={300}
                width={1000}
                className="w-full h-91.25 object-cover object-top"
              />
            </div>
            <div className="flex gap-x-4 mt-12 text-[#3687FF] text-sm font-medium">
              <p className="min-w-max">
                {parseDate(blog.project.startDate, false)}
                {blog.project.endDate
                  ? " - " + parseDate(blog.project.endDate, false)
                  : undefined}
              </p>
              {blog.project.stack.length > 0 && (
                <>
                  <span>-</span>
                  <p className="text-overflow-ellipsis">
                    {blog.project.stack.map((item) => item.tech).join(", ")}
                  </p>
                </>
              )}
            </div>
          </>
        )}
        <h1 className="text-[32px] leading-10.5 mt-4">{blog.title}</h1>
        <RichText
          data={blog.content}
          converters={blogConverter}
          className="font-medium text-gray"
        />
      </div>
    </BlogProvider>
  );
}
