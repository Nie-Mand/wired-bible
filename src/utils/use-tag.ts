import { useParams } from "next/navigation";
import { useMemo } from "react";

export function useTag() {
  const params = useParams();

  const tag = useMemo(() => {
    if (!params) {
      return undefined;
    }
    if (params["tag"]) {
      return params["tag"];
    }
    return undefined;
  }, [params]);

  return tag;
}
