import cx from "classnames";
import { geistMono } from "../(app)/page";
import { HomePageBlogCms } from "@/lib/cms/types";

export function BlogItem({
  blog,
  variant,
  isLast,
  ...props
}: {
  blog: HomePageBlogCms;
  isLast: boolean;
  variant: "normal" | "hovered" | "dimmed";
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={"/writings/" + blog.slug}
      {...props}
      className={cx(
        "leading-5.5 flex justify-between px-2 py-3.5 transition-all duration-200",
        variant === "hovered" && "text-[#3687FF]",
        variant === "dimmed" && "text-secondary",
        !isLast && "border-b border-b-separator-gray",
        props.className
      )}
    >
      <h4 className="text-gray-gray">{blog.title}</h4>
      {blog.category && (
        <span
          className={cx(
            `${geistMono.className} text-sm leading-4.5 transition-all duration-200`,
            variant === "hovered" ? "text-primary" : "text-secondary"
          )}
        >
          {blog.category}
        </span>
      )}
    </a>
  );
}
