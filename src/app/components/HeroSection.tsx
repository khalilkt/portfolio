import Image from "next/image";
import { SocialIcon, WhatsappIcon } from "./icons";
import { Button } from "./components";
import { HomepageCms } from "@/lib/cms/types";
import {
  RichText,
  defaultJSXConverters,
} from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import CalButton from "./CalButton";
import { TObject } from "@/lib/translation";

interface HeroSectionProps {
  data: HomepageCms["Header"];
  t: TObject;
}
export const AVATAR_SECTION_ID = "AVATAR_SECTION";
export function AvatarDiv({ data }: HeroSectionProps) {
  return (
    <section id={AVATAR_SECTION_ID} className="flex flex-col gap-y-2.5 mb-8 ">
      <div className="flex gap-x-2.5 items-center">
        {data.avatar.url && (
          <Image
            src={data.avatar.url}
            width={40}
            height={40}
            alt={data.avatar.alt}
          />
        )}
        <div className="flex flex-col gap-y-0.5">
          <h3 className="font-semibold text-sm">{data.title}</h3>
          <h5 className=" text-xs text-secondary">{data.subTitle}</h5>
        </div>
      </div>
      <div className="flex gap-x-4 ml-12.5 items-center">
        {data.socials.map((social, index) => {
          return (
            <SocialIcon key={index} href={social.url} icon={social.icon} />
          );
        })}
      </div>
    </section>
  );
}

export default function HeroSection({ data, t }: HeroSectionProps) {
  const wtp = data.socials.find((e) => e.icon === "whatsapp");

  return (
    <section className="w-full flex flex-col">
      <RichText
        className="text-base leading-6.5 md:leading-7 "
        data={data.description as unknown as SerializedEditorState}
        converters={{
          ...defaultJSXConverters,
          text: (props) => {
            const node = props.node;
            if (node.format === 0) {
              return (
                <span className="text-secondary font-semibold">
                  {node.text}
                </span>
              );
            }
            if (node.format === 1) {
              return <span className="font-semibold">{node.text}</span>;
            }

            return defaultJSXConverters?.text
              ? (defaultJSXConverters.text as CallableFunction)(props)
              : node.text;
          },
        }}
      />
      <div className="flex gap-x-2.5 mt-6">
        <CalButton>{t.book_call_cta}</CalButton>
        {wtp && (
          <a href={wtp.url}>
            <Button variant="text">
              <WhatsappIcon className="fill-[#25D366]" />
              <span className="font-semibold">{t.lets_chat_cta}</span>
            </Button>
          </a>
        )}
      </div>
    </section>
  );
}
