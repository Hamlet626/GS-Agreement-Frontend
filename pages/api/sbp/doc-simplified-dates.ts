import type { NextApiResponse } from "next";
// @ts-ignore
import { computeDocEmbeddings, constructPrompt } from "openai_embedding";
import {mergeDates} from "../../../utils/datesFolder";
import {NextApiRequest} from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  try {
    let {sbpFields,dateMergeList} = await mergeDates(req.body.rawSbpFields);

    return res.status(200).json({
      sbpFields,
      dateMergeList
    });
  } catch (error: any) {
    res.status(500).end({
      message: "An unexpected error occurred please try again later",
    });
  }
}


