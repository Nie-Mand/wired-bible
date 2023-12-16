"use client";
import { useChapter, useTagged } from "@/utils/use-services";
import { useChapterParams, useTag } from "@/utils/use-tag";
import { NextUIProvider, Chip, Skeleton, Card } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
  const chapter = useChapterParams();

  const practices = useChapter(chapter as string);

  return (
    <NextUIProvider className="dark">
      <main className="px-4">
        {practices.isLoading ? (
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-3 w-3/5 rounded-lg" />
            <Skeleton className="h-3 w-4/5 rounded-lg" />
          </div>
        ) : null}

        {!practices.isLoading && practices.data ? (
          <div>
            <Chip className="capitalize" color="danger" variant="flat">
              {practices.data.length === 0
                ? "Nil: Nothing related to this"
                : chapter}
            </Chip>
            <div className="py-10">
              {practices.data.length === 0 ? null : (
                <Card className="p-8" radius="sm">
                  {practices.data.map((practice, idx) => (
                    <div className="py-4" key={idx}>
                      <p className="font-light">{practice.text}</p>
                      {practice.tags.map((tag, tIdx) => (
                        <Link href={`/tag/${tag}`} key={tIdx}>
                          <Chip
                            key={tIdx}
                            className="capitalize"
                            color="warning"
                            variant="flat"
                            size="sm"
                          >
                            {tag}
                          </Chip>
                        </Link>
                      ))}
                    </div>
                  ))}
                </Card>
              )}
            </div>
          </div>
        ) : null}
      </main>
    </NextUIProvider>
  );
}
