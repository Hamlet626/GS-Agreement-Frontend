import type { NextApiResponse } from "next";
import openAiChat from "../../../utils/openAiChat";
// @ts-ignore
import { computeDocEmbeddings, constructPrompt } from "openai_embedding";
import {NextApiRequest} from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {

    const chatInitialData = [
      {
        role: "system",
        content: `You are a helpful contract document analyst for the file below:
            ${req.body.fileText}`,
      },
      {
        role: "user",
        content: `Based on the payments criteria, what are premises/prerequisites which could infer or determine amount or date of any payment? Put those premises into "date"/"yes or no(boolean)" two categories and provide me a JSON for those premises information, for example:
            {"date":["transfer date","xx date"],"boolean":["multiple fetuses"]}

            Note that omit keys directly about payment date, instead provide date or boolean that could infer payment occurrence or date or amount.

            JSON answers:`,
      },
    ];

    const { lastChoice: sbpLastChoice } = await openAiChat(chatInitialData,400);

    let rawSbpFields = JSON.parse(sbpLastChoice?.content || "");

    return res.status(200).json({
      rawSbpFields
    });
  } catch (error: any) {
    res.status(500).end({
      message: "An unexpected error occurred please try again later",
    });
  }
}

