import type { NextApiRequest, NextApiResponse } from "next";
import { openaiConfig } from "../../../utils/openAiConfiguration";
import openAiChat from "../../../utils/openAiChat";
import {getPaymentTabs} from "../../../utils/apis/getPaymentTabs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.status(200).json({
      sbpPaymentTabs: await getPaymentTabs(req.body.fileText,req.body.formOptions)//sbpLastChoice?.content//.replace(/TBD/g, '0'),
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