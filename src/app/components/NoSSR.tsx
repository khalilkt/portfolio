// NoSSRWrapper.tsx
import React, { useEffect, useState } from "react";

interface NoSSRProps {
  children: React.ReactNode;
}

export const NoSSR: React.FC<NoSSRProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // only render on client
  }, []);

  if (!mounted) return null;

  return <>{children}</>;
};
