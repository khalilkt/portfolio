"use client";

import { TObject } from "@/lib/translation";

export default function Footer({
  t,
  twitterUrl,
}: {
  t: TObject;
  twitterUrl: string | undefined;
}) {
  return (
    <div className="flex flex-col  mx-auto gap-y-8 items-center">
      <button
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="font-medium w-max text-sm leading-4.5 py-2.5 px-3.5 bg-[#E8E8E8] rounded-[10px] cursor-pointer"
      >
        {t.back_to_top_cta}
      </button>
      {twitterUrl && (
        <p className="text-sm font-medium">
          {t.follow_me_on}{" "}
          <a href={twitterUrl} className="text-secondary">
            X/Twitter
          </a>
        </p>
      )}
    </div>
  );
}
