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


export function useChapterParams() {
  const params = useParams();

  const chapter = useMemo(() => {
    if (!params) {
      return undefined;
    }
    if (params["chapter"]) {
      return params["chapter"];
    }
    return undefined;
  }, [params]);

  return chapter;
}