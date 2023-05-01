import { oauth2Client } from "@/utils/func/oauth";
import { google } from "googleapis";

import { NextApiRequest, NextApiResponse } from "next";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query && req.body) {
    const token = req.query as any;
    oauth2Client.setCredentials(token);
    const classroom = google.classroom({ version: "v1", auth: oauth2Client });

    classroom.courses.update({
      id: token.id,
      requestBody: {
        id: token.id,
        name: req.body,
      },
    });
  }
  res.status(200).json(false);
};

export default handler;
