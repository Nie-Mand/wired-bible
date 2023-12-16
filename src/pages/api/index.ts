import * as service from "@/services";
import { type Practice } from "@/services";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const index: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Practice[]>
) => {
  try {
    const tag = req.query.tag as string;
    const chapter = req.query.chapter as string;

    if (chapter) {
      const data = await service.list(chapter);
      res.status(200).json(data);
    } else if (tag) {
      const data = await service.tagged(tag);
      res.status(200).json(data);
      return;
    } else {
      res.status(200).json([]);
    }
  } catch {
    return res.status(500).json({ errors: ["Something went wrong"] } as any);
  }
};

export default index;
