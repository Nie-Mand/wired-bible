export interface Practice {
  text: string;
  tags: string[];
}

const data: Practice[] = [
  {
    text: "Hello World",
    tags: ["hello", "world"],
  },
  {
    text: "Goodbye World",
    tags: ["goodbye", "world"],
  },
];

export function all() {
  return data;
}

export function tagged(tag: string) {
  return data.filter((d) => d.tags.includes(tag));
}
