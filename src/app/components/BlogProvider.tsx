"use client";

import { createContext, useContext, useState } from "react";

export const BlogProvider = ({ children }: { children: React.ReactNode }) => {
  const [hoveredUrl, setHoveredUrl] = useState<string | null>(null);
  return (
    <BlogContext.Provider value={{ hoveredUrl, setHoveredUrl }}>
      {children}
    </BlogContext.Provider>
  );
};

const BlogContext = createContext<{
  hoveredUrl: string | null;
  setHoveredUrl: (url: string | null) => void;
} | null>(null);

export const useBlogProvider = () => {
  const context = useContext(BlogContext);
  if (!context)
    throw new Error("useBlogProvider must be used within BlogProvider");
  return context;
};
