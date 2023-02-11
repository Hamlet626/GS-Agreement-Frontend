import nextConnect from "next-connect";
import multer from "multer";
import type { NextApiResponse } from "next";
import { processPDF2 } from "../../utils";
import PdfParse from "pdf-parse";

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

apiRoute.use(upload.single("pdfFile"));

apiRoute.post(async (req: any, res: NextApiResponse) => {
  try {
    const { titles }: any = await processPDF2(req.file.path);
    const { text } = await PdfParse(req.file.path);

    res.status(200).json({ titles, text });
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
