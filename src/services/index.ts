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
  const keys = await kv.keys(`${chapter}:*`);
  const ids = keys
    .filter((k) => k.endsWith("text"))
    .map((key) => key.split(":")[1]);

  const chaptersKeys = keys
    .filter((k) => k.endsWith("text"))
    .map((key) => `${key.split(":")[0]}:${key.split(":")[1]}:text`);
  const chapters = await kv.mget<string[]>(...chaptersKeys);

  const tags = keys
    .filter((k) => !k.endsWith("text"))
    .map((key) => key.split(":")[3].split(","));

  const data: Practice[] = new Array(chapters.length).fill({}).map((_, i) => ({
    chapter: keys[i].split(":")[0],
    text: chapters[i],
    tags: tags[i],
    id: parseInt(ids[i]),
  }));

  data.sort((a, b) => a.id! - b.id!);
  return data;
}

export async function tagged(tag: string) {
  const keys = await kv.keys(`*:*:*${tag}*`);

  const chaptersKeys = keys.map(
    (key) => `${key.split(":")[0]}:${key.split(":")[1]}:text`
  );
  const chapters = await kv.mget<string[]>(...chaptersKeys);

  const tags = keys.map((key) => key.split(":")[3].split(","));

  const data: Practice[] = new Array(chapters.length).fill({}).map((_, i) => ({
    chapter: keys[i].split(":")[0],
    text: chapters[i],
    tags: tags[i],
    id: parseInt(keys[i].split(":")[1]),
  }));
  // for (const key of keys) {
  //   const id = key.split(":")[1];
  //   const chapter = key.split(":")[0];
  //   const text = await kv.get<string>(`${chapter}:${id}:text`);
  //   const tagsKeys = await kv.keys(`*:${id}:tags:*`);
  //   const tags = tagsKeys[0].split(":")[3].split(",");

  //   data.push({
  //     chapter,
  //     text: text || "",
  //     tags,
  //     id: parseInt(id),
  //   });
  // }

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
