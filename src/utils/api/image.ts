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

export const imageUploadFetch = async (base64: string, token: string) => {
  return fetch("/api/v1/image", {
    method: "POST",
    body: base64,
    headers: {
      Authorization: token,
    },
  })
    .then((data) => {
      return data.json();
    })
    .catch((e) => {
      console.info(e);
      return null;
    });
};

export const imageUploadFunc = async (
  id: string,
  type: string,
  buffer: Buffer
) => {
  try {
    const params = {
      Bucket: `yakjung/images`,
      Key: `${id}${Date.now()}.${type}`,
      Body: buffer,
      ACL: "public-read",
      ContentEncoding: "base64",
      ContentType: `image/${type}`,
    };
    return { data: (await s3.upload(params).promise()) as any, error: false };
  } catch (e) {
    return { error: e };
  }
};

export const imageBase64Func = async (file: any) => {
  return new Promise((resolve, reject) => {
    try {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        return resolve(reader.result);
      };
    } catch (e) {
      reject(e);
    }
  });
};

export const deleteImageS3 = async (url: string) => {
  const params = {
    Bucket: `yakjung`,
    Key: `images/${url.split("/images/")[1]}`,
  };
  await s3
    .deleteObject(params)
    .promise()
    .catch((e) => {
      console.info(e);
    });

  return true;
};
