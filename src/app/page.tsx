"use client";
import { useChapters } from "@/utils/use-services";
import { NextUIProvider, Divider, Link, Skeleton } from "@nextui-org/react";
import NextLink from "next/link";

export default function Home() {
  const chapters = useChapters();

  return (
    <NextUIProvider className="dark">
      <p className="text-center capitalize text-sm md:text-base">
        patterns, rules, short-length lessons from my experience or from
        different books, blogs of software development.
      </p>
      <Divider className="my-4" />
      <div className="flex flex-col space-y-3 px-4">
        {chapters.isLoading ? (
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-3 w-3/5 rounded-lg" />
            <Skeleton className="h-3 w-1/5 rounded-lg" />
            <Skeleton className="h-3 w-2/5 rounded-lg" />
            <Skeleton className="h-3 w-1/5 rounded-lg" />
            <Skeleton className="h-3 w-2/5 rounded-lg" />
            <Skeleton className="h-3 w-3/5 rounded-lg" />
          </div>
        ) : null}
        {!chapters.isLoading &&
          chapters.data &&
          chapters.data.map((chapter) => (
            <Link
              as={NextLink}
              href={`/${chapter}`}
              color="secondary"
              className="capitalize"
              key={chapter}
            >
              {chapter}
            </Link>
          ))}
      </div>
    </NextUIProvider>
  );
}
