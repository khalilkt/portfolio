"use client";

import { useEffect, useMemo, useState } from "react";

const BREAKPOINT_MIN_WIDTH = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export const useDeviceSize = () => {
  const calculateDeviceBreakpoint = () => {
    if (typeof window === "undefined") {
      return "sm";
    } else {
      for (const [breakpoint, minWidth] of Object.entries(
        BREAKPOINT_MIN_WIDTH,
      ).reverse()) {
        if (window.innerWidth >= minWidth) {
          return breakpoint;
        }
      }
      return "sm";
    }
  };

  const [deviceSize, setDeviceSize] = useState(calculateDeviceBreakpoint);

  useEffect(() => {
    const handleResize = () => {
      setDeviceSize(calculateDeviceBreakpoint);
    };
    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, [calculateDeviceBreakpoint]);

  return { deviceSize };
};
