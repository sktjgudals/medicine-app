import { oauth2Client } from "@/utils/func/oauth";
import { google } from "googleapis";

import { NextApiRequest, NextApiResponse } from "next";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.query) {
      const token = req.query as any;
      oauth2Client.setCredentials(token);
      const classroom = google.classroom({ version: "v1", auth: oauth2Client });
      const course = await classroom.courses.get({
        id: token.id,
      });
      const cre = await classroom.courses.topics.create({
        courseId: token.id,
        requestBody: { name: "네임입니다" },
      });
      console.info(cre);
      // id: '112043348295620876022',
      // 클래스룸 초대 보낸리스트 조회
      // const a = await classroom.invitations.list({
      //   // userId: "me",
      //   courseId: token.id,
      // });
      // console.info(a.data);

      // const aa = await classroom.invitations.accept({
      //   id: "gnaotpx",
      // });
      // console.info(aa);
      // `;
      //  enrollmentCode: 'gnaotpx',
      //course 606388443746
      // {
      //   id: 'NjA2Mzg4NDQzNzQ2KjYwNzA3NjE3NDIxOFpa',
      //   courseId: '606388443746',
      //   role: 'STUDENT'
      // }
      //초대 link create
      // const b = await classroom.invitations.create({
      //   requestBody: {
      //     // id: course.data.id,
      //     courseId: token.id,
      //     userId: "stakuofficial@gmail.com",
      //     role: "STUDENT",
      //   },
      // });
      // console.info(b.data);

      // const user = await classroom.userProfiles.get({
      //   userId: "me",
      // });
      // console.info(user.data);
      // const a = await classroom.courses.students.create({
      //   courseId: token.id,
      //   requestBody: {
      //     userId: "112043348295620876022",
      //     profile: { name: { fullName: "풀네임?", familyName: "패밀리 네임" } },
      //   },
      // });
      // console.info(a.data);
      // console.info(course);
      if (course) {
        return res.status(200).json({ course: course.data });
      }
    }
    return res.status(200).json({ course: false });
  } catch (e) {
    console.info(e);
    return res.status(200).json({ course: false });
  }
};

export default handler;
