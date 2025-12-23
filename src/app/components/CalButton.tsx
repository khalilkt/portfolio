"use client";

import { getCalApi } from "@calcom/embed-react";
import { ReactNode, useEffect } from "react";
import { Button } from "./components";
export default function CalButton({ children }: { children: ReactNode }) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);
  return (
    <Button
      data-cal-namespace="30min"
      data-cal-link="khalil-ktiri-btenjq/30min"
      data-cal-config='{"layout":"month_view"}'
      variant={"primary"}
    >
      {children}
    </Button>
  );
}
