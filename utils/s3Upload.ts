import { readFileSync } from "fs";
import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.NEXT_AWS_ACCESS_ID,
  secretAccessKey: process.env.NEXT_AWS_SECRET_KEY,
});

const s3 = new AWS.S3();

export const s3Upload = (filePath: string, fileOriginalname: string) => {
  const fileName = `${new Date().getTime()}_${fileOriginalname}`;
  const fileContent = readFileSync(filePath);

  const params = {
    Bucket: process.env.NEXT_AWS_S3_BUCKET || "",
    Key: fileName,
    Body: fileContent,
  };

  s3.upload(params, (err: any, data: { Location: any }) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`File uploaded successfully. File URL: ${data.Location}`);
    }
  });
};
