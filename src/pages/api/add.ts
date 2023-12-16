import * as service from "@/services";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { kv } from "@vercel/kv";
import { ZodError, z } from "zod";
import { randomUUID } from "crypto";

const schema = z.object({
  chapter: z.string(),
  text: z.string(),
  tags: z.array(z.string()),
});

const add: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
  } else {
    const { success, error, data } = schema.safeParse(req.body);

    if (!success) {
      const _error: ZodError = error;
      return res.status(400).json({ errors: _error.issues });
    }

    try {
      await service.add(data);
      return res.status(200).json({ done: true });
    } catch {
      return res.status(500).json({ errors: ["Something went wrong"] });
    }
  }
};

export default add;
