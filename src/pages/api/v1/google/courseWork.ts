import { oauth2Client } from "@/utils/func/oauth";
import { google } from "googleapis";

import { NextApiRequest, NextApiResponse } from "next";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query && req.body) {
    const token = req.query as any;
    const { title, description } = JSON.parse(req.body);
    oauth2Client.setCredentials(token);
    const classroom = google.classroom({ version: "v1", auth: oauth2Client });
    const aa = await classroom.courses.courseWork.create({
      courseId: token.id,
      requestBody: {
        courseId: token.id,
        title: title,
        description: description,
        workType: "ASSIGNMENT",
        maxPoints: 100,
      },
    });
    console.info(aa);
  }

  //https://developers.google.com/classroom/reference/rest/v1/courses.courseWork?hl=ko
  res.status(200).json(false);
};

export default handler;
