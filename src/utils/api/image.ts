import { Credentials } from "aws-sdk";
import S3 from "aws-sdk/clients/s3";
const s3 = new S3({
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_ENDPOINT,
  sslEnabled: true,
  s3ForcePathStyle: false,
  credentials: new Credentials({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  }),
});
export const imageUploadFunc = async (
  id: string,
  type: string,
  buffer: Buffer
) => {
  try {
    const params = {
      Bucket: `yakjung/post/images`,
      Key: `${id}${Date.now()}.${type}`,
      Body: buffer,
      ACL: "public-read",
      ContentEncoding: "base64",
      ContentType: `image/${type}`,
    };
    return await s3.upload(params).promise();
  } catch (e) {
    return false;
  }
};