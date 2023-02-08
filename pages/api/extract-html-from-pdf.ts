import nextConnect from "next-connect";
import multer from "multer";
import pdfParse from "pdf-parse";
import type { NextApiResponse } from "next";

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

apiRoute.post((req: any, res: NextApiResponse) => {
  try {
    pdfParse(req.file.path).then((result) => {
      res.status(200).json(result);
    });
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
