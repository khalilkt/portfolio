import {
  defaultJSXConverters,
  RichText,
} from "@payloadcms/richtext-lexical/react";
import { ComponentProps } from "react";
import Image from "next/image";

export const blogConverter: ComponentProps<typeof RichText>["converters"] = {
  ...defaultJSXConverters,
  heading: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });
    return <h2 className="text-2xl font-medium mt-10 ">{children}</h2>;
  },
  paragraph: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });
    return (
      <p className="mt-5 text-gray font-medium leading-7 relative">
        {children}
        {/* P cannot be  a descendent of p  */}
        {/* <div className="hidden absolute -right-70 top-0 bg-[#F0F0F0] rounded-lg w-60 p-3">
          <p className="text-gray text-md">aaosihdoasd</p>
          <p className="text-gray text-xs leading-4.5">
            Lorem ipsum dolor sit amet consectetur. Amet et amet.
          </p>
        </div> */}
      </p>
    );
  },
  upload: ({ node }) => {
    return (
      <>
        <Image
          alt={node.value.alt}
          src={node.value.url as string}
          className="w-full mt-12"
          width={600}
          height={365}
        />
      </>
    );
  },
};
