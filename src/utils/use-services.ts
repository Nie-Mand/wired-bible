import { Practice } from "@/services";
import useSWR from "swr";

export function useChapters() {
  return useSWR("/api/chapters", () => {
    return fetch("/api/chapters")
      .then((res) => res.json())
      .then((data) => data.chapters as string[]);
  });
}

export function useTagged(tag: string) {
  return useSWR(
    ["/api/tagged", tag],
    () => {
      return fetch("/api/?tag=" + tag)
        .then((res) => res.json())
        .then((data) => data as Practice[]);
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
}

export function useChapter(chapter: string) {
  return useSWR(
    ["/api/chapter", chapter],
    () => {
      return fetch("/api/?chapter=" + chapter)
        .then((res) => res.json())
        .then((data) => data as Practice[]);
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
}
