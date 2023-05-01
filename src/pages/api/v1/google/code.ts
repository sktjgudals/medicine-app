import { oauth2Client } from "@/utils/func/oauth";
import { google } from "googleapis";

import { NextApiRequest, NextApiResponse } from "next";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.body) {
    const token = JSON.parse(req.body);
    oauth2Client.setCredentials({ refresh_token: token.refresh_token });
    const classroom = google.classroom({ version: "v1", auth: oauth2Client });
    const res = await classroom.courses.list({
      pageSize: 10,
    });

    // console.info(res.data);
  }
  res.status(200).json({ test: "test" });
};

export default handler;
