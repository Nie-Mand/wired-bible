import { kv } from "@vercel/kv";

export interface Practice {
  chapter: string;
  text: string;
  tags: string[];
  id?: number;
}

export async function chapters() {
  const keys = await kv.keys("*");
  const prefixes = keys.map((key) => key.split(":")[0]);
  const set = new Set(prefixes);
  return Array.from(set);
}

export async function list(chapter: string) {
  const keys = await kv.keys(`${chapter}:*:text`);
  const ids = keys.map((key) => key.split(":")[1]);

  let data: Practice[] = [];
  for (const id of ids) {
    const text = await kv.get<string>(`${chapter}:${id}:text`);
    const tagsKeys = await kv.keys(`${chapter}:${id}:tags:*`);
    const tags = tagsKeys[0].split(":")[3].split(",");

    data.push({
      chapter,
      text: text || "",
      tags,
      id: parseInt(id),
    });
  }

  data.sort((a, b) => a.id! - b.id!);

  return data;
}

export async function tagged(tag: string) {
  const keys = await kv.keys(`*:*:*${tag}*`);

  let data: Practice[] = [];
  for (const key of keys) {
    const id = key.split(":")[1];
    const chapter = key.split(":")[0];
    const text = await kv.get<string>(`${chapter}:${id}:text`);
    const tagsKeys = await kv.keys(`*:${id}:tags:*`);
    const tags = tagsKeys[0].split(":")[3].split(",");

    data.push({
      chapter,
      text: text || "",
      tags,
      id: parseInt(id),
    });
  }

  data.sort((a, b) => a.id! - b.id!);

  return data;
}

export async function add(data: Practice) {
  const keys = await kv.keys(`${data.chapter}:*:text`);
  const id = keys.length;
  await kv.set(`${data.chapter}:${id}:text`, data.text);
  await kv.set(`${data.chapter}:${id}:tags:${data.tags.join(",")}`, "");
  return;
}
