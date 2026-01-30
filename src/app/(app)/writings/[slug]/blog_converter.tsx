import {
  defaultJSXConverters,
  RichText,
} from "@payloadcms/richtext-lexical/react";
import { ComponentProps, JSX } from "react";
import Image from "next/image";
import { Media } from "@/payload-types";
import { SerializedListNode } from "@payloadcms/richtext-lexical";
import cx from "classnames";
import ImageWrapper from "@/app/components/ImageWrapper";

export const blogConverter: ComponentProps<typeof RichText>["converters"] = {
  ...defaultJSXConverters,

  heading: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });
    const Tag = `${node.tag}` as keyof JSX.IntrinsicElements;
    return (
      <Tag className=" text-primary mt-10 text-2xl leading-8">{children}</Tag>
    );
  },
  link: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });
    return (
      <a href={node.fields.url} className="text-blue-600 underline">
        {children}
      </a>
    );
  },
  paragraph: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });
    return (
      <p className="mt-5 text-gray leading-7 tracking-[-.02em]">{children}</p>
    );
  },
  listitem: ({ node, nodesToJSX, parent }) => {
    const children = nodesToJSX({ nodes: node.children });

    const haveNestedList = node.children.some((child) => child.type === "list");
    const isNumberedList =
      parent.type === "list"
        ? (parent as SerializedListNode)?.listType === "number"
        : false;

    return (
      <li
        className={cx(
          ` ml-8 leading-7 tracking-[-.02em]`,
          !haveNestedList && (isNumberedList ? "list-decimal" : "list-disc"),
        )}
      >
        {children}
      </li>
    );
  },
  list: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });
    return <node.tag className="space-y-2 mt-3">{children}</node.tag>;
  },
  upload: ({ node }) => {
    return (
      <ImageWrapper className="mt-12">
        <Image
          alt={(node.value as Media).alt}
          src={(node.value as Media).url as string}
          className="w-full rounded-md"
          width={600}
          height={365}
        />
      </ImageWrapper>
    );
  },
};
