import { NextApiRequest, NextApiResponse } from "next";
import jwtDecode from "jwt-decode";
import { imageUploadFunc } from "@/utils/api/image";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.headers.authorization;
  if (token && req.body) {
    const decodedToken = jwtDecode(token) as any;
    if (decodedToken) {
      const buffer = Buffer.from(
        req.body.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
      const type = req.body.split(";")[0].split("/")[1];
      const result = await imageUploadFunc(decodedToken.id, type, buffer);
      if (result) {
        const { ETag, Location, Key, Bucket } = result;
        return res.status(200).json({ url: Location });
      } else {
        return res.status(200).json({ url: null });
      }
    }
    return res.status(404).json({ error: true });
  } else {
    return res.status(404).json({ url: null });
  }
};

export default handler;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "200mb",
    },
  },
};
