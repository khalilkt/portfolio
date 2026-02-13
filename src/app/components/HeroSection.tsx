"use client";

import Image from "next/image";
import { CloseIcon, HeaderDropIcon, SocialIcon, WhatsappIcon } from "./icons";
import { Button } from "./components";
import { HomepageCms, socialIconNames } from "@/lib/cms/types";
import {
  RichText,
  defaultJSXConverters,
} from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import CalButton from "./CalButton";
import { TObject } from "@/lib/translation";
import cx from "classnames";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import { NoSSR } from "./NoSSR";
import { useDeviceSize } from "./hooks";

interface HeroSectionProps {
  data: HomepageCms["Header"];
  t: TObject;
  isNav?: boolean;
  showAvatar?: boolean;
}
export const AVATAR_SECTION_ID = "AVATAR_SECTION";

function HeaderLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname =
    typeof window !== "undefined" ? window.location.pathname.split("/") : "";

  return (
    <a
      className={cx(
        "hidden md:block",
        "font-medium text-sm leading-4.5 px-1.5 rounded-md hover:bg-black/5 transition-colors duration-150",
        "text-secondary hover:text-primary",
      )}
      href={href}
    >
      {children}
    </a>
  );
}

function HeaderDropdownExpanded({ data, t }: Omit<HeroSectionProps, "isNav">) {
  const wtp = useMemo(
    () => data.socials.find((e) => e.icon === "whatsapp"),
    [data.socials],
  );

  useEffect(() => {
    // disable body scroll when dropdown is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className={cx(
        "fixed top-0 px-5 left-0 w-full h-full bg-white z-40 flex flex-col items-center justify-center transition-opacity duration-150 md:hidden",
      )}
    >
      {[
        { href: "/", label: "Home" },
        { href: "/writings", label: t.writing },
        ...data.socials.map((social) => ({
          href: social.url,
          label: socialIconNames[social.icon],
        })),
      ].map((link, index) => (
        <a
          key={index}
          href={link.href}
          className="text-secondary py-3 text-center font-medium w-full text-sm leading-4.5 px-1.5 rounded-md hover:bg-black/5 transition-colors duration-150"
        >
          {link.label}
        </a>
      ))}
      <div className="flex flex-col  w-full gap-y-2.5 mt-6">
        {wtp && (
          <a href={wtp.url} className="w-max mx-auto">
            <Button variant="text">
              <WhatsappIcon className="fill-[#25D366]" />
              <span className="font-semibold">{t.lets_chat_cta}</span>
            </Button>
          </a>
        )}
        <CalButton className="w-full text-center flex justify-center ">
          {t.book_call_cta}
        </CalButton>
      </div>
    </div>
  );
}

export function AvatarDiv({
  data,
  t,
  isNav = false,
  showAvatar = true,
}: HeroSectionProps) {
  // TODO : this should be false
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { deviceSize } = useDeviceSize();

  useEffect(() => {
    if (deviceSize !== "sm") {
      setIsNavOpen(false);
    }
  }, [deviceSize]);

  return (
    <section
      className={`flex w-full  md:w-auto justify-between md:justify-start gap-y-2.5 py-0.75 ${isNav ? "flex-row" : "flex-col mb-8"}`}
      id={isNav ? undefined : AVATAR_SECTION_ID}
    >
      <div className="flex gap-x-2.5 items-center">
        {data.avatar.url && (
          <a href={"/"} aria-label={t.homepage}>
            <Image
              src={data.avatar.url}
              width={40}
              height={40}
              alt={data.avatar.alt}
              className={cx(
                "transition-all duration-150 rounded-xl ",
                showAvatar ? "w-10 h-10" : "w-0 h-10",
              )}
            />
          </a>
        )}
        {!isNav && (
          <div className="flex flex-col gap-y-0.5">
            <h3 className="font-semibold text-sm">{data.title}</h3>
            <h5 className=" text-xs text-secondary">{data.subTitle}</h5>
          </div>
        )}
      </div>
      <div
        className={`flex gap-x-4 items-center ${isNav ? "ml-2.5" : " ml-12.5"}`}
      >
        {isNav && <HeaderLink href="/">{"Home"}</HeaderLink>}
        {isNav && <HeaderLink href="/writings">{t.writing}</HeaderLink>}
        {data.socials.slice(0, isNav ? 2 : undefined).map((social, index) => {
          if (isNav) {
            return (
              <HeaderLink key={index} href={social.url}>
                {socialIconNames[social.icon]}
              </HeaderLink>
            );
          }
          return (
            <SocialIcon key={index} href={social.url} icon={social.icon} />
          );
        })}
      </div>
      {isNav && (
        <button onClick={() => setIsNavOpen((prev) => !prev)}>
          {isNavOpen ? <CloseIcon /> : <HeaderDropIcon />}
        </button>
      )}

      <NoSSR>
        {isNavOpen &&
          createPortal(
            <HeaderDropdownExpanded data={data} t={t} />,
            document.body,
          )}
      </NoSSR>
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
