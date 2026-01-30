export const dynamic = "force-dynamic";

import { BlogItem } from "@/app/components/BlogItem";
import BlogsSection from "@/app/components/BlogsSection";
import { getAllBlogsList, getLabelAssets } from "@/lib/cms/cms";

export default async function BlogsListPage() {
  const blogs = await getAllBlogsList();
  const groupedByYear = {} as Record<number, typeof blogs>;
  const t = await getLabelAssets();

  blogs.forEach((blog) => {
    const year = new Date(blog.publishedDate).getFullYear();
    if (!groupedByYear[year]) {
      groupedByYear[year] = [];
    }
    groupedByYear[year].push(blog);
  });

  return (
    <main>
      <h1 className="text-3xl leading-10">{t.writings}</h1>
      <p className="text-gray mt-2">{t.writings_description}</p>
      <div className="gap-y-8 mt-11">
        {Object.entries(groupedByYear)
          .sort((a, b) => Number(b[0]) - Number(a[0]))
          .map(([year, blogs]) => (
            <section key={year} className="mb-8">
              <h2 className="text-highlight text-base font-medium">{year}</h2>
              <BlogsSection blogs={blogs} t={t} showTitle={false} />
            </section>
          ))}
      </div>
    </main>
  );
}
