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
    let formOptions: string;

    const dates=Object.entries(req.body.sbpForm).filter(([key, value]) => value!=="Yes" && value !== "No");

    console.log(`dates: ${dates}`);
    ///if user didn't fill any date, no need to ask for dates to prevent ChatGPT Error
    if(dates.length===0){
      formOptions=Object.entries(req.body.sbpForm)
          .map(([key, value]) => `${key.replace(/_/g, " ")}: ${value}`)
          .join("\n");
    } else{
      console.log(`dateMergeList: ${JSON.stringify(req.body.dateMergeList)}`);
      const allDatesKeys=Object.keys(req.body.dateMergeList).reduce((acc,key)=>{
        if(dates.some(([k,v])=>k===key)) acc.concat(req.body.dateMergeList[key]);return acc},[]);
      console.log(`allDatesKeys: ${allDatesKeys}`);
      const allDates=JSON.parse((await openAiChat([
          { role: "system", content: `You are a date calculator assistant. Known these dates:
          ${dates.map(([k,v])=>`${k}: ${(v as Date).toDateString()}`).join("\n")}` },
          { role: "user", content: `What would be the following date?
          ${allDatesKeys.join("\n")}
          answer in JSON (with formate {“date a”:“01-16-2023", “date b”: “02-22-2023"}):` },
      ])).lastChoice?.content||"");
      console.log(`allDates: ${allDates}`);

      formOptions = Object.entries(allDates)
          .concat(Object.entries(req.body.sbpForm).filter(([key, value]) =>value==="Yes" || value === "No"))
        .map(([key, value]) => `${key.replace(/_/g, " ")}: ${value}`)
        .join("\n");
    }
    console.log(`formOptions: ${formOptions}`);

    const sbpDocPrompt = await constructPrompt(
      "Estimate and list all single payments (with type and amount, with date on that month if could be estimated) the surrogate would get on the following 12 month separated into months in json format as the example below:",
      req.body.embeddings,
        2000
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
      await openAiChat(chat,1500);

    console.log(sbpLastChoice?.content);
    res.status(200).json({
      sbpPaymentTabs: JSON.parse(sbpLastChoice?.content || ""),
    });
  } catch (error: any) {
    res.status(500).end({
      message: "An unexpected error occurred please try again later",
    });
  }
}
