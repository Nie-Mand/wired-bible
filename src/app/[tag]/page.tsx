"use client";
import { Practice } from "@/services";
import { useTag } from "@/utils/use-tag";
import { NextUIProvider, Chip, Skeleton, Card } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const tag = useTag();
  const [loading, setLoading] = useState(true);
  const [practices, setPractices] = useState<Practice[]>([]);

  useEffect(() => {
    fetch("/api?tag=" + tag)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        setPractices(data);
      });
  }, []);

  return (
    <NextUIProvider className="dark">
      <main className="min-h-screen">
        {loading ? (
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-3 w-3/5 rounded-lg" />
            <Skeleton className="h-3 w-4/5 rounded-lg" />
          </div>
        ) : (
          <div>
            <Chip className="capitalize" color="danger" variant="flat">
              {practices.length === 0 ? "Nil: Nothing related to this" : tag}
            </Chip>
            <div className="py-10">
              {practices.length === 0 ? null : (
                <Card className="p-8" radius="sm">
                  {practices.map((practice, idx) => (
                    <div className="py-4" key={idx}>
                      <h2 className="">{practice.text}</h2>
                      {practice.tags.map((tag, tIdx) => (
                        <Link href={`/${tag}`}>
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
        )}
      </main>
    </NextUIProvider>
  );
}
