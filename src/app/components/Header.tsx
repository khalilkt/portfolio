"use client";

import { useEffect, useState } from "react";
import { AVATAR_SECTION_ID, AvatarDiv } from "./HeroSection";
import { HomepageCms } from "@/lib/cms/types";
import { TObject } from "@/lib/translation";

export default function Header({
  data,
  t,
}: {
  data: HomepageCms["Header"];
  t: TObject;
}) {
  const [isAvatarVisible, setIsAvatarVisible] = useState(true);

  useEffect(() => {
    const target = document.getElementById(AVATAR_SECTION_ID);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAvatarVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1, // 10% visible
      },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, []);
  return (
    <header
      className={`fixed z-50 px-6 flex pt-5 bg-white/80 backdrop-blur-md transition-all duration-150 w-full ${isAvatarVisible ? " opacity-0 -top-10" : "opacity-100 top-0"}`}
    >
      <AvatarDiv data={data} t={t} isNav={true} />
    </header>
  );
}
