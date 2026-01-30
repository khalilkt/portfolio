"use client";
import { useState } from "react";
import { BlogItem } from "./BlogItem";
import { BlogCms, HomePageBlogCms } from "@/lib/cms/types";
import { TObject } from "@/lib/translation";

export default function BlogsSection({
  blogs,
  t,
  showTitle = true,
}: {
  blogs: Pick<BlogCms, "slug" | "title" | "category">[];
  t: TObject;
  showTitle?: boolean;
}) {
  const [hoveredItemIndex, setHoveredItemIndex] = useState<number | null>(null);
  return (
    <section className="flex flex-col">
      {showTitle && <h2 className="leading-5.5 text-gray">{t.writings}</h2>}
      <ul className="mt-4">
        {blogs.map((b, index) => (
          <BlogItem
            isLast={index === blogs.length - 1}
            onMouseEnter={() => setHoveredItemIndex(index)}
            onMouseLeave={() => setHoveredItemIndex(null)}
            onFocus={() => setHoveredItemIndex(index)}
            onBlur={() => setHoveredItemIndex(null)}
            key={index}
            blog={b}
            variant={
              hoveredItemIndex !== null
                ? hoveredItemIndex === index
                  ? "hovered"
                  : "dimmed"
                : "normal"
            }
          />
        ))}
      </ul>
    </section>
  );
}
