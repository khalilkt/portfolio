"use client";

import { TObject } from "@/lib/translation";

export default function Footer({
  t,
  resumeUrl,
}: {
  t: TObject;
  resumeUrl: string | undefined;
}) {
  return (
    <div className="flex flex-col  mx-auto gap-y-8 items-center">
      <button
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="font-medium w-max text-sm leading-4.5 py-2.5 px-3.5 bg-[#E8E8E8] transition-opacity duration-150 hover:opacity-80 rounded-[10px] cursor-pointer"
      >
        {t.back_to_top_cta}
      </button>
      {resumeUrl && (
        <p className="text-sm font-medium">
          {t.download_cv_cta}{" "}
          <a href={resumeUrl} className="text-secondary" download>
            {t.download_cv_link}
          </a>
        </p>
      )}
    </div>
  );
}
