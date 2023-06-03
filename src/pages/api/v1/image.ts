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
      if (!result.error) {
        const { ETag, Location, Key } = result.data;
        return res.status(200).json({ url: Location });
      } else {
        return res.status(200).json({ url: null, error: result.error });
      }
    }
    return res.status(404).json({ error: "body or token error" });
  } else {
    return res.status(404).json({ error: "not found error" });
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
