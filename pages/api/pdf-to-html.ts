import nextConnect from "next-connect";
import multer from "multer";
import type { NextApiResponse } from "next";
import { processPDF2 } from "../../utils/processPdf";
import PdfParse from "pdf-parse";
import { s3Upload } from "../../utils/s3Upload";

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res: any) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single("documentFile"));

apiRoute.post(async (req: any, res: NextApiResponse) => {
  try {
    const { titles }: any = await processPDF2(req.file.path);
    const { text }: any = await PdfParse(req.file.path);

    let sections = [];

    for (let i = 0; i < titles.length; i++) {
      sections.push({
        title: titles[i],
        text: text
          .replaceAll(/\s{3,}/g, "")
          .split(titles[i])
          .pop()
          .split(titles[i + 1])[0]
          .replace(/(?<!\n)\n(?!\n)/g, "")
          .replace(/^\n\n/, "")
          .replace(/\n+$/, ""),
        transcriptions: [],
      });
    }

    res.status(200).json({ sections });
    // Store PDF File in S3 Bucket
    s3Upload(req.file.path, req.file.originalname);
  } catch (error: any) {
    res.status(500).end({
      message: "An unexpected error occurred please try again later",
    });
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
