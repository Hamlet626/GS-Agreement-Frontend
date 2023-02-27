import { readFileSync } from "fs";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";


const s3 = new S3Client({
  region: process.env.NEXT_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_AWS_ACCESS_ID || '',
    secretAccessKey: process.env.NEXT_AWS_SECRET_KEY || '',
  },
});

export const s3Upload = async (filePath: string, fileOriginalname: string) => {
  const fileName = `${new Date().getTime()}_${fileOriginalname}`;
  const fileContent = readFileSync(filePath);

  try {
    const command = new PutObjectCommand({
      Bucket: process.env.NEXT_AWS_S3_BUCKET || "",
      Key: fileName,
      Body: fileContent,
    });
    const response = await s3.send(command);
    console.log(`File uploaded successfully. ${response}`);
  } catch (err) {
    console.error(`Error uploading file to S3: ${err}`);
  }
};
