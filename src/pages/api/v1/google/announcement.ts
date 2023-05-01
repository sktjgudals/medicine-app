import { oauth2Client } from "@/utils/func/oauth";
import { google } from "googleapis";

import { NextApiRequest, NextApiResponse } from "next";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query && req.body) {
    const token = req.query as any;
    oauth2Client.setCredentials(token);
    const classroom = google.classroom({ version: "v1", auth: oauth2Client });
    const announcementsCreate = await classroom.courses.announcements.create({
      courseId: token.id,
      requestBody: { text: req.body },
    });

    if (announcementsCreate.status === 200) {
      res.status(200).json(true);
    }
  }
  res.status(200).json(false);
};

export default handler;
