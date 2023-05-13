import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import FormData from "form-data";
import fs from "fs";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const fileData = await new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm({
      maxFileSize: 5 * 1024 * 1024,
      keepExtensions: true,
    });

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      return resolve(files);
    });
  });
  console.info(fileData);
  res.status(200).json({ ad: "test" });
};

export default handler;

const saveFile = async (file: any) => {
  const data = fs.readFileSync(file.path);
  console.info(data);
  //   fs.writeFileSync(`./public/${file.name}`, data);
  //   await fs.unlinkSync(file.path);
  return;
};

export const config = {
  api: {
    bodyParser: false,
  },
};
