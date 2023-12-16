import * as service from "@/services";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const chapters: NextApiHandler = async (
  _req: NextApiRequest,
  res: NextApiResponse<{
    chapters: string[];
  }>
) => {
  try {
    const data = await service.chapters();
    res.status(200).json({
      chapters: data,
    });
  } catch {
    res.status(500).json({ errors: ["Something went wrong"] } as any);
  }
};

export default chapters;
