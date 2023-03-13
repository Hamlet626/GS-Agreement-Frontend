import type { NextApiResponse } from "next";
import { openaiConfig } from "../../../utils/openAiConfiguration";
import openAiChat from "../../../utils/openAiChat";



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
    let formOptions = "";

    for (const [key, value] of Object.entries(req.body.sbpForm)) {
      formOptions = formOptions + `${key.replace(/_/g, " ")}: ${value}`;
    }

    const chat = [
      ...req.body.chat,
      {
        role: "user",
        content: `Given the document, and these information by surrogate:

        ${formOptions}
        
        estimate and list all single payments (with type and amount, with date on that month if could be estimated) the surrogate would get on the following 12 month separated into months in json format as the example below:
        Json Example:
        {"certain_payments":["Jan 2022":[{"date":1,"type":"fee1","amount":10.00},{"type":"fee2","amount":10.00}],"Feb 2022":[{"date":12,"type":"fee2","amount":11.00}],...],"uncertain_payments":[{"type":"fee4","amount":100.00}],}
        
        JSON answers:`,
      },
    ];

    const { chat: sbpChatChoices, lastChoice: sbpLastChoice } =
      await openAiChat(chat);

    res.status(200).json({
      sbpPaymentTabs: sbpLastChoice?.content,
      sbpChatChoices,
    });
  } catch (error: any) {
    res.status(500).end({
      message: "An unexpected error occurred please try again later",
    });
  }
};
