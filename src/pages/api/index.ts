import { Practice, all, tagged } from "@/services";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const index: NextApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse<Practice[]>
) => {
  const tag = req.query.tag as string;

  if (tag) {
    const data = tagged(tag);
    res.status(200).json(data);
    return;
  }

  const data = all();
  res.status(200).json(data);
};

export default index;
