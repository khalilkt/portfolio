"use client";

import { useEffect, useState } from "react";
import { AVATAR_SECTION_ID } from "./HeroSection";

export default function Header() {
  const [isAvatarVisible, setIsAvatarVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(AVATAR_SECTION_ID);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAvatarVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1, // 10% visible
      }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, []);
  return (
    <header
      className={`fixed z-50 flex gap-x-10 bg-white/80 backdrop-blur-md border-b border-black/5 transition-all duration-150 h-10 w-full ${isAvatarVisible ? " opacity-0 -top-10" : "opacity-100 top-0"}`}
    >
      <a href="/">home</a>
      <a href="/writings">Writings</a>
    </header>
  );
}
