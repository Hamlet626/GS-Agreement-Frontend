import type { NextApiResponse } from "next";
import { openaiConfig } from "../../../utils/openAiConfiguration";
import openAiChat from "../../../utils/openAiChat";
// @ts-ignore
import { constructPrompt } from "openai_embedding";

export default async function handler(req: any, res: NextApiResponse) {
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
    const formOptions: string = Object.entries(req.body.sbpForm)
      .map(([key, value]) => `${key.replace(/_/g, " ")}: ${value}`)
      .join(", ");


    const sbpDocPrompt = await constructPrompt(
      "Estimate and list all single payments (with type and amount, with date on that month if could be estimated) the surrogate would get on the following 12 month separated into months in json format as the example below:",
      req.body.embeddings
    );

    const chat = [
      {
        role: "system",
        content: `You are a helpful contract document analyst for the file below:
        ${sbpDocPrompt.join("\n ")}`,
      },
      {
        role: "user",
        content: `Given the document, and these information by surrogate:

        ${formOptions}

        Estimate and list all single payments (with type and amount, with date on that month if could be estimated) the surrogate would get on the following 12 month separated into months in json format as the example below:
        Json Example:
        {"certain_payments":["Jan 2022":[{"date":1,"type":"fee1","amount":10.00},{"type":"fee2","amount":10.00}],"Feb 2022":[{"date":12,"type":"fee2","amount":11.00}],...],"uncertain_payments":[{"type":"fee4","amount":100.00}],}
        
        JSON answers:`,
      },
    ];

    const { lastChoice: sbpLastChoice } =
      await openAiChat(chat);

    res.status(200).json({
      sbpPaymentTabs: JSON.parse(sbpLastChoice?.content || ""),
    });
  } catch (error: any) {
    res.status(500).end({
      message: "An unexpected error occurred please try again later",
    });
  }
}
