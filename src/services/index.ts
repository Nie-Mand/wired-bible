import { kv } from "@vercel/kv";
import { randomUUID } from "crypto";

// export default async function Cart({ params }: { params: { user: string } }) {
//   const cart = await kv.get<{ id: string; quantity: number }[]>(params.user);
//   return (
//     <div>
//       {cart?.map((item) => (
//         <div key={item.id}>
//           {item.id} - {item.quantity}
//         </div>
//       ))}
//     </div>
//   );
// }

export interface Practice {
  chapter: string;
  text: string;
  tags: string[];
}

// const data: Practice[] = [
//   {
//     text: "Store your code in a codebase, One code base per application, in a version control system, which contains multiple deploys (deployment environments).",
//     tags: ["twelve-factors", "environment"],
//   },
//   {
//     text: "Have a dependency management tooling, and Never rely on system-wide dependencies.",
//     tags: ["twelve-factors", "environment"],
//   },
//   {
//     text: "Separate the application config, Which varies between deploys, they shall be separated from the code and be stored in the environment (environment variables), preferably separated into named groups (per environment) and in a declarative manner.",
//     tags: ["twelve-factors", "environment"],
//   },
//   {
//     text: "Backing Services (Databases, Third Parties..) shall be treated as Attached Resources and part of the code, and switchable from deploy to deploy.",
//     tags: ["twelve-factors", "environment"],
//   },
//   {
//     text: "Strictly separate between build (transform the code into an executable, release (combine the build with the config) and run (run the processes) stages. The separation involves separating the actions and practices to do for each stage (only update code in build, not runtime..) Give an ID for a release or version it where it cannot be mutated.",
//     tags: ["twelve-factors", "environment"],
//   },
//   {
//     text: "Your app runs as one or multiple stateless processes that share nothing, if any data to be shared use a Backing Service. Once a process is dead, no state shall be left for that process.",
//     tags: ["twelve-factors", "environment"],
//   },
//   {
//     text: "Apps shall be self-contained and export their own HTTP Server (or any TCP/UDP endpoint) bound to a system port and shall not rely on another entity to do so. Routers like Tomcat and Nginx shall be used in a deployment environment as a routing layer from public-facing hostnames.",
//     tags: ["twelve-factors", "environment"],
//   },
//   {
//     text: "Building the app in the multiple process format, shall be scaled out with concurrency, since they are stateless, and processes and threads management shall be managed by a process manager.",
//     tags: ["twelve-factors", "environment"],
//   },
//   {
//     text: "Apps and Processes are disposable (can be started or stopped at a moment's notice), so they should be robust with fast startup (Make them fast to start) and graceful shutdown (Make them robust against sudden death too).",
//     tags: ["twelve-factors", "environment"],
//   },
//   {
//     text: "Keep development, staging and production as similar as possible, don't try to change a setting from dev to prod in Continuous Deployment.",
//     tags: ["twelve-factors", "environment"],
//   },
//   {
//     text: "Treat logs as event streams, just write them to stdout, and don't bother with writing them to an output file, so an external process manager will handle them.",
//     tags: ["twelve-factors", "environment"],
//   },
//   {
//     text: "Run admin/management tasks as one-off processes, like database migration, scripts... For example using a Custom CLI or a Makefile.",
//     tags: ["twelve-factors", "environment"],
//   },
// ];

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
    });
  }

  return data;
}

export async function tagged(tag: string) {
  const keys = await kv.keys(`*:*:*${tag}*`);

  let data: Practice[] = [];
  for (const key of keys) {
    const id = key.split(":")[1];
    console.log(id);
    const chapter = key.split(":")[0];
    const text = await kv.get<string>(`${chapter}:${id}:text`);
    const tagsKeys = await kv.keys(`*:${id}:tags:*`);
    const tags = tagsKeys[0].split(":")[3].split(",");

    data.push({
      chapter,
      text: text || "",
      tags,
    });
  }

  return data;
}

export async function add(data: Practice) {
  const id = randomUUID();
  await kv.set(`${data.chapter}:${id}:text`, data.text);
  await kv.set(`${data.chapter}:${id}:tags:${data.tags.join(",")}`, "");
  return;
}
