import type { NextApiRequest, NextApiResponse } from "next";
import { openaiConfig } from "../../../utils/openAiConfiguration";
import openAiChat from "../../../utils/openAiChat";
// @ts-ignore
// import { constructPrompt } from "openai_embedding";
import {unmergeDates} from "../../../utils/datesFolder";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  try {
    let formOptions: string=await unmergeDates(req.body.sbpForm,req.body.dateMergeList);

    res.status(200).json({
      formOptions
    });
  } catch (error: any) {
    res.status(500).end({
      message: "An unexpected error occurred please try again later",
    });
  }
}

