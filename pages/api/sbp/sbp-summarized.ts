import nextConnect from "next-connect";
import multer from "multer";
import type { NextApiResponse } from "next";
import { unlinkSync } from "fs";
import { openaiConfig } from "../../../utils/openAiConfiguration";
import openAiChat from "../../../utils/openAiChat";
import PdfParse from "pdf-parse";
import {
  computeDocEmbeddings,
  constructPrompt,
} from "../../../utils/generateEmbedding";
// import generateEmbedding from "../../../utils/generateEmbedding";

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
    const { text: sbpDocTextPrompt }: any = await PdfParse(req.file.path);

    // const embeddings = await computeDocEmbeddings(sbpDocTextPrompt);

    const embeddings = await computeDocEmbeddings(sbpDocTextPrompt)


    const sbpDocPrompt = await constructPrompt(
      "Based on the payments criteria, what are premises/prerequisites which could infer or determine amount or date of any payment?",
      embeddings
    );

    // console.log(sbpDocPrompt);
    // const chatInitialData = [
    //   {
    //     role: "system",
    //     content: `You are a helpful contract document analyst for the file below:
    //       ${sbpDocText}`,
    //   },
    //   {
    //     role: "user",
    //     content: `Based on the payments criteria, what are premises/prerequisites which could infer or determine amount or date of any payment? Put those premises into "date"/"yes or no(boolean)" two categories and provide me a JSON for those premises information, for example:
    //     {"date":["transfer date","xx date"],"boolean":["multiple fetuses"]}

    //     Note that omit keys directly about payment date, instead provide date or boolean that could infer payment occurrence or date or amount.

    //     JSON answers:`,
    //   },
    // ];

    // const { chat: sbpChatChoices, lastChoice: sbpLastChoice } =
    //   await openAiChat(chatInitialData);
    res.status(200).json({
      // sbpFields: JSON.parse(sbpLastChoice?.content || ""),
      sbpFileName: req.file.originalname,
      sbpDocPrompt,
      embeddings,
    });

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
