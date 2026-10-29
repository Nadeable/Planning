import { useEffect, useState } from "react";
import { useDesk } from "@/lib/store";

export function useDeskReady(): boolean {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let live = true;
    void (async () => {
      await useDesk.persist.rehydrate();
      useDesk.getState().afterLoad();
      if (live) setReady(true);
    })();
    return () => {
      live = false;
    };
  }, []);
  return ready;
}
