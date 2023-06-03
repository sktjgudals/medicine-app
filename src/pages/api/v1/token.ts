import {
  generateAccessOauthToken,
  generateAccessToken,
  tokenVerify,
} from "@/utils/token";
import prisma from "prisma/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.headers.authorization) {
    const { access, refresh } = JSON.parse(req.headers.authorization) as {
      access: string;
      refresh: string;
    };
    const accessVerify = await tokenVerify(access);
    if (accessVerify) {
      return res
        .status(200)
        .json({ session: accessVerify, access_token: null, type: "verify" });
    } else {
      const refreshVerify = (await tokenVerify(refresh)) as any;
      if (refreshVerify) {
        const user = await prisma.user.findFirst({
          where: { id: refreshVerify["id"] },
          select: {
            id: true,
            image: true,
            email: true,
            type: true,
            nickname: true,
          },
        });
        if (user) {
          let access_token;
          if (user.type === "local") {
            access_token = await generateAccessToken(
              user["id"],
              user["email"] ? user["email"] : "",
              user["nickname"],
              user["image"]
            );
          } else {
            access_token = await generateAccessOauthToken(
              user["id"],
              user["nickname"],
              user["image"],
              user["email"]
            );
          }
          return res.status(200).json({
            session: null,
            access_token,
            type: "reissue",
          });
        } else {
          return res.status(404).json(false);
        }
      } else {
        return res.status(200).json({
          session: null,
          access_token: null,
          type: "logout",
        });
      }
    }
  } else {
    return res.status(404).json(false);
  }
};

export default handler;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "20mb",
    },
  },
};
