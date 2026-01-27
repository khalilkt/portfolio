"use client";

import { useEffect, useRef, useState } from "react";
import { LinkIcon } from "./icons";

interface LinkMetadata {
  title: string | null;
  description: string | null;
  image: string | null;
  url: string;
}

export default function LinkPreview({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [metadata, setMetadata] = useState<LinkMetadata | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;

    const fetchMetadata = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/link-preview", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch link preview");
        }

        const data = await response.json();
        setMetadata(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, [url]);

  if (loading || !metadata || error) {
    return null;
  }

  return (
    <div
      ref={ref}
      style={{
        left: url.includes("youtube") ? -280 : undefined,
        right: url.includes("youtube") ? undefined : -280,
        // left: -280,
      }}
      className="absolute p-0.75 shadow-sm bg-white rounded-lg w-60 top-0"
    >
      <div className="bg-[#F6F6F6] rounded-lg">
        {metadata.image && (
          <img
            src={metadata.image}
            alt="Link preview"
            className="w-full h-32 object-cover rounded mb-2"
            onError={() => {}}
          />
        )}
        <div className=" p-2.5">
          {metadata.title && (
            <h3 className="font-medium text-gray-900 text-xs leading-4.5 line-clamp-2">
              {metadata.title}
            </h3>
          )}
          {metadata.description && (
            <p className="text-gray text-[10px] leading-4 mt-1 line-clamp-3">
              {metadata.description}
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-x-2 items-center mt-1.5 m-0.75">
        <LinkIcon className="w-3 h-3 " />
        <a
          href={metadata.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 text-xs block hover:underline truncate"
        >
          {new URL(metadata.url).hostname}
        </a>
      </div>
    </div>
  );
}
