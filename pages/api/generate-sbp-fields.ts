import nextConnect from "next-connect";
import multer from "multer";
import type { NextApiResponse } from "next";
import { unlinkSync } from "fs";

const upload = multer({
  storage: multer.diskStorage({
    destination: "/tmp",
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

apiRoute.use(upload.single("sbpDocumentFile"));

apiRoute.post(async (req: any, res: NextApiResponse) => {
  try {
    const fakeSbpFields = [
      { label: "Transfer Date", name: "transfer_date", id: "1" },
      { label: "Contract sign date", name: "contract_sign_date", id: "2" },
      { label: "Medication date", name: "medication_date", id: "3" },
    ];

    res
      .status(200)
      .json({ sbpFields: fakeSbpFields, sbpFileName: req.file.originalname });

    unlinkSync(req.file.path);
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
