import type { NextApiRequest, NextApiResponse } from "next";
import { openaiConfig } from "../../../utils/openAiConfiguration";
import openAiChat from "../../../utils/openAiChat";
// @ts-ignore
// import { constructPrompt } from "openai_embedding";
import {unmergeDates} from "../../../utils/datesFolder";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
    let formOptions: string=await unmergeDates(req.body.sbpForm,req.body.dateMergeList);

    const chat = [
      {
        role: "system",
        content: `You are a helpful contract document analyst for the file below:
        ${req.body.fileText}
        `,
      },
      {
        role: "user",
        content: `Given the document, and these information by surrogate:

        ${formOptions}

        Estimate and list all single payments (with type and amount, with date on that month if could be estimated) the surrogate would get on the following 12 month separated into months in json format as the example below:
        Json Example:
        {"certain_payments":{"Jan 2022":[{"date":1,"type":"fee1","amount":10.00},{"type":"fee2","amount":10.00}],"Feb 2022":[{"date":12,"type":"fee2","amount":11.00}],...},"uncertain_payments":[{"type":"fee4","amount":100.00}],}

        JSON answers:`,
      },
    ];
    // Note: Ensure that the 'date' and 'type' fields in the JSON are formatted as strings, while the 'amount' field should always be in numerical format.


    const { lastChoice: sbpLastChoice } =
      await openAiChat(chat,1200);

    console.log(sbpLastChoice?.content);
    res.status(200).json({
      sbpPaymentTabs: sbpLastChoice?.content//.replace(/TBD/g, '0'),
    });
  } catch (error: any) {
    res.status(500).end({
      message: "An unexpected error occurred please try again later",
    });
  }
}

const sample=`{
  "certain_payments": [
    {
      "Dec 2023": [
        {
          "date": 1,
          "type": "Main Pregnancy Compensation",
          "amount": 4180
        }
      ]
    },
    {
      "Jan 2024": [
        {
          "date": 1,
          "type": "Monthly non-accountable allowance",
          "amount": 300
        },
        {
          "date": null,
          "type": "Injection Medication Start Fee",
          "amount": 600
        }
      ]
    },
    {
      "Feb 2024": [
        {
          "date": 1,
          "type": "Monthly non-accountable allowance",
          "amount": 300
        }
      ]
    },
    {
      "Mar 2024": [
        {
          "date": 1,
          "type": "Monthly non-accountable allowance",
          "amount": 300
        }
      ]
    },
    {
      "Apr 2024": [
        {
          "date": 1,
          "type": "Monthly non-accountable allowance",
          "amount": 300
        }
      ]
    },
    {
      "May 2024": [
        {
          "date": 1,
          "type": "Monthly non-accountable allowance",
          "amount": 300
        }
      ]
    },
    {
      "Jun 2024": [
        {
          "date": 1,
          "type": "Monthly non-accountable allowance",
          "amount": 300
        }
      ]
    },
    {
      "Jul 2024": [
        {
          "date": 1,
          "type": "Monthly non-accountable allowance",
          "amount": 300
        }
      ]
    },
    {
      "Aug 2024": [
        {
          "date": 1,
          "type": "Monthly non-accountable allowance",
          "amount": 300
        }
      ]
    },
    {
      "Sep 2024": [
        {
          "date": 1,
          "type": "Monthly non-accountable allowance",
          "amount": 300
        }
      ]
    },
    {
      "Oct 2024": [
        {
          "date": 1,
          "type": "Monthly non-accountable allowance",
          "amount": 300
        }
      ]
    },
    {
      "Nov 2024": [
        {
          "date": 1,
          "type": "Monthly non-accountable allowance",
          "amount": 300
        }
      ]
    }
  ],
  "uncertain_payments": []
}
`