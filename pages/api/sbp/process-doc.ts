import nextConnect from "next-connect";
import multer from "multer";
import type { NextApiResponse } from "next";
import { readFileSync, unlinkSync } from "fs";
import { openaiConfig } from "../../../utils/openAiConfiguration";
import openAiChat from "../../../utils/openAiChat";
// @ts-ignore
import { computeDocEmbeddings, constructPrompt } from "openai_embedding";
import {processPDF2} from "../../../utils/processPdf";
import {extractOriginalText} from "../../../utils/extractOriginalText";
import {mergeDates} from "../../../utils/datesFolder";
import PdfParse from "pdf-parse";

export const config = {
  api: {
    bodyParser: false,
  },
};


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

  if (!openaiConfig.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  try {

    // const file = readFileSync(req.file.path);
    // const fileText = await extractOriginalText((await PdfParse(file)).text);

    const fileText=await extractOriginalText((await processPDF2(req.file.path)).text);

    res.status(200).json({
      sbpFileName: req.file.originalname,
      fileText,
    });

    return
  } catch (error: any) {
    console.log(error);
    res.status(500).end({
      message: "An unexpected error occurred please try again later",
    });
  }
});

export default apiRoute;

