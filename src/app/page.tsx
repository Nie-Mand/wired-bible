"use client";
import { NextUIProvider, Divider, Link } from "@nextui-org/react";
import NextLink from "next/link";

const chapters = ["hello", "world"];
export default function Home() {
  return (
    <NextUIProvider className="dark">
      <p className="text-center capitalize">
        patterns, rules, short-length lessons from my experience or from
        different paradigms of software development.
      </p>
      <Divider className="my-4" />
      <div className="flex flex-col space-y-3">
        {chapters.map((chapter) => (
          <NextLink href={`/${chapter}`} className="capitalize">
            <Link color="foreground">{chapter}</Link>
          </NextLink>
        ))}
      </div>
    </NextUIProvider>
  );
}
