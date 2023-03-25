import nextConnect from "next-connect";
import multer from "multer";
import type { NextApiResponse } from "next";
import { s3Upload } from "../../utils/s3Upload";
import mammoth from "mammoth";
import jsdom from "jsdom";
import { unlinkSync } from "fs";
import {processSections} from "../../utils/processSections";

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

apiRoute.use(upload.single("documentFile"));

apiRoute.post(async (req: any, res: NextApiResponse) => {
  const { JSDOM } = jsdom;
  try {
    let titles: any = await mammoth
      .convertToHtml({ path: req.file.path })
      .then(function ({ value }) {
        const dom = new JSDOM(value);
        const strongTags: NodeListOf<HTMLElement> =
          dom.window.document.querySelectorAll("strong");

        return Array.from(strongTags).map((t)=>t.textContent);
      });

    let rawText: any = await mammoth
      .extractRawText({ path: req.file.path })
      .then(function (result) {
        return result.value;
      });

    let sections: any = processSections(titles,rawText);
      
    res.status(200).json({ sections });

    // Store Doc File in S3 Bucket
    if(process.env.REACT_APP_ENV === 'production'){
      await s3Upload(req.file.path, req.file.originalname);
    }
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
