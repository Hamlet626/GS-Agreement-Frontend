import type { NextApiRequest, NextApiResponse } from "next";
import { openaiConfig } from "../../../utils/openAiConfiguration";
import openAiChat from "../../../utils/openAiChat";
// @ts-ignore
// import { constructPrompt } from "openai_embedding";
import {unmergeDates} from "../../../utils/datesFolder";

const fake1 = {
  "certain_payments": {
    "July 2023": [
      {
        "date": 1,
        "type": "Main Pregnancy Compensation",
        "amount": 4180.00
      }
    ],
    "August 2023": [
      {
        "date": 1,
        "type": "Main Pregnancy Compensation",
        "amount": 4180.00
      }
    ],
    "September 2023": [
      {
        "date": 1,
        "type": "Main Pregnancy Compensation",
        "amount": 4180.00
      },
      {
        "type": "Monthly non-accountable allowance",
        "amount": 300.00
      },
      {
        "type": "Multiple Pregnancy Compensation",
        "amount": 7000.00
      }
    ],
    "October 2023": [
      {
        "date": 1,
        "type": "Main Pregnancy Compensation",
        "amount": 4180.00
      },
      {
        "type": "Monthly non-accountable allowance",
        "amount": 300.00
      }
    ],
    "November 2023": [
      {
        "date": 1,
        "type": "Main Pregnancy Compensation",
        "amount": 4180.00
      },
      {
        "type": "Monthly non-accountable allowance",
        "amount": 300.00
      }
    ],
    "December 2023": [
      {
        "date": 1,
        "type": "Main Pregnancy Compensation",
        "amount": 4180.00
      },
      {
        "type": "Monthly non-accountable allowance",
        "amount": 300.00
      }
    ],
    "January 2024": [
      {
        "date": 1,
        "type": "Main Pregnancy Compensation",
        "amount": 4180.00
      },
      {
        "type": "Monthly non-accountable allowance",
        "amount": 300.00
      }
    ],
    "February 2024": [
      {
        "date": 1,
        "type": "Main Pregnancy Compensation",
        "amount": 4180.00
      },
      {
        "type": "Monthly non-accountable allowance",
        "amount": 300.00
      }
    ],
    "March 2024": [
      {
        "date": 1,
        "type": "Main Pregnancy Compensation",
        "amount": 4180.00
      },
      {
        "type": "Monthly non-accountable allowance",
        "amount": 300.00
      },
      {
        "type": "Injection Medication Start Fee",
        "amount": 600.00
      }
    ],
    "April 2024": [
      {
        "date": 1,
        "type": "Main Pregnancy Compensation",
        "amount": 4180.00
      },
      {
        "type": "Monthly non-accountable allowance",
        "amount": 300.00
      }
    ],
    "May 2024": [
      {
        "date": 1,
        "type": "Main Pregnancy Compensation",
        "amount": 4180.00
      },
      {
        "type": "Monthly non-accountable allowance",
        "amount": 300.00
      }
    ],
    "June 2024": [
      {
        "date": 1,
        "type": "Main Pregnancy Compensation",
        "amount": 4180.00
      },
      {
        "type": "Monthly non-accountable allowance",
        "amount": 300.00
      },
      {
        "type": "Maternity clothing allowance",
        "amount": 800.00
      }
    ]
  },
  "uncertain_payments": [
    {
      "type": "Embryo Transfer Fee",
      "amount": 1000.00
    },
    {
      "type": "Travel Reimbursement",
      "amount": "TBD"
    },
    {
      "type": "Evaluation/Cancelled Cycle",
      "amount": 500.00
    },
    {
      "type": "Invasive Procedure",
      "amount": "500.00 to 7000.00"
    },
    {
      "type": "Bed Rest/Activity Restriction",
      "amount": "250.00/Week"
    },
    {
      "type": "Breast Milk",
      "amount": "300.00/Week"
    },
    {
      "type": "Life Insurance",
      "amount": "TBD"
    },
    {
      "type": "Health Insurance",
      "amount": "TBD"
    },
    {
      "type": "Lost Wages (Net Hourly Rate)",
      "amount": "TBD"
    }
  ]
}
const fake2 = {
  "certain_payments": {
    "Aug 2023": [
      {
        "date": 1,
        "type": "Main Pregnancy Compensation",
        "amount": 4180.0
      },
      {
        "date": 1,
        "type": "Monthly Non-Accountable Allowance",
        "amount": 300.0
      }
    ],
    "Sep 2023": [
      {
        "date": 1,
        "type": "Main Pregnancy Compensation",
        "amount": 4180.0
      },
      {
        "date": 1,
        "type": "Monthly Non-Accountable Allowance",
        "amount": 300.0
      }
    ],
    "Oct 2023": [
      {
        "date": 1,
        "type": "Main Pregnancy Compensation",
        "amount": 4180.0
      },
      {
        "date": 1,
        "type": "Monthly Non-Accountable Allowance",
        "amount": 300.0
      }
    ],
    "Nov 2023": [
      {
        "date": 1,
        "type": "Main Pregnancy Compensation",
        "amount": 4180.0
      },
      {
        "date": 1,
        "type": "Monthly Non-Accountable Allowance",
        "amount": 300.0
      }
    ],
    "Dec 2023": [
      {
        "date": 1,
        "type": "Main Pregnancy Compensation",
        "amount": 4180.0
      },
      {
        "date": 1,
        "type": "Monthly Non-Accountable Allowance",
        "amount": 300.0
      }
    ],
    "Jan 2024": [
      {
        "date": 1,
        "type": "Main Pregnancy Compensation",
        "amount": 4180.0
      },
      {
        "date": 1,
        "type": "Monthly Non-Accountable Allowance",
        "amount": 300.0
      }
    ],
    "Feb 2024": [
      {
        "date": 1,
        "type": "Main Pregnancy Compensation",
        "amount": 4180.0
      },
      {
        "date": 1,
        "type": "Monthly Non-Accountable Allowance",
        "amount": 300.0
      }
    ],
    "Mar 2024": [
      {
        "date": 1,
        "type": "Main Pregnancy Compensation",
        "amount": 4180.0
      },
      {
        "date": 1,
        "type": "Monthly Non-Accountable Allowance",
        "amount": 300.0
      },
      {
        "date": 10,
        "type": "Injection Medication Start Fee",
        "amount": 600.0
      }
    ],
    "Apr 2024": [
      {
        "date": 1,
        "type": "Main Pregnancy Compensation",
        "amount": 4180.0
      },
      {
        "date": 1,
        "type": "Monthly Non-Accountable Allowance",
        "amount": 300.0
      },
      {
        "date": 20,
        "type": "Multiple Pregnancy Compensation",
        "amount": 7000.0
      },
      {
        "date": 20,
        "type": "Embryo Transfer Fee",
        "amount": 1000.0
      }
    ],
    "May 2024": [
      {
        "date": 1,
        "type": "Main Pregnancy Compensation",
        "amount": 4180.0
      },
      {
        "date": 1,
        "type": "Monthly Non-Accountable Allowance",
        "amount": 300.0
      },
      {
        "date": 31,
        "type": "Maternity Clothing Allowance",
        "amount": 800.0
      }
    ],
    "Jun 2024": [
      {
        "date": 1,
        "type": "Main Pregnancy Compensation",
        "amount": 4180.0
      },
      {
        "date": 1,
        "type": "Monthly Non-Accountable Allowance",
        "amount": 300.0
      }
    ],
    "Jul 2024": [
      {
        "date": 1,
        "type": "Main Pregnancy Compensation",
        "amount": 4180.0
      },
      {
        "date": 1,
        "type": "Monthly Non-Accountable Allowance",
        "amount": 300.0
      },
      {
        "date": 19,
        "type": "Multiple Pregnancy Compensation",
        "amount": 7000.0
      }
    ]
  },
  "uncertain_payments": [
    {
      "type": "Breast Milk",
      "amount": 300.0
    }
  ]
}
const fake3 = {
  "certain_payments": {
    "Sep 2023": [
      {
        "date": 1,
        "type": "Main Pregnancy Compensation",
        "amount": 4180
      },
      {
        "date": 1,
        "type": "Multiple Pregnancy Compensation",
        "amount": 7000
      },
      {
        "date": 1,
        "type": "Monthly Non-Accountable Allowance",
        "amount": 300
      },
      {
        "date": 1,
        "type": "Contract Signing Bonus",
        "amount": 500
      },
      {
        "date": 1,
        "type": "Matching Bonus",
        "amount": 500
      }
    ],
    "Oct 2023": [
      {
        "date": 1,
        "type": "Main Pregnancy Compensation",
        "amount": 4180
      },
      {
        "date": 1,
        "type": "Monthly Non-Accountable Allowance",
        "amount": 300
      }
    ],
    "Nov 2023": [
      {
        "date": 1,
        "type": "Main Pregnancy Compensation",
        "amount": 4180
      },
      {
        "date": 1,
        "type": "Monthly Non-Accountable Allowance",
        "amount": 300
      }
    ],
    "Dec 2023": [
      {
        "date": 1,
        "type": "Main Pregnancy Compensation",
        "amount": 4180
      },
      {
        "date": 1,
        "type": "Monthly Non-Accountable Allowance",
        "amount": 300
      }
    ],
    "Jan 2024": [
      {
        "date": 1,
        "type": "Main Pregnancy Compensation",
        "amount": 4180
      },
      {
        "date": 1,
        "type": "Monthly Non-Accountable Allowance",
        "amount": 300
      }
    ],
    "Feb 2024": [
      {
        "date": 1,
        "type": "Main Pregnancy Compensation",
        "amount": 4180
      },
      {
        "date": 1,
        "type": "Monthly Non-Accountable Allowance",
        "amount": 300
      }
    ],
    "Mar 2024": [
      {
        "date": 1,
        "type": "Main Pregnancy Compensation",
        "amount": 4180
      },
      {
        "date": 1,
        "type": "Monthly Non-Accountable Allowance",
        "amount": 300
      },
      {
        "date": 30,
        "type": "Injection Medication Start Fee",
        "amount": 600
      }
    ],
    "Apr 2024": [
      {
        "date": 1,
        "type": "Main Pregnancy Compensation",
        "amount": 4180
      },
      {
        "date": 1,
        "type": "Monthly Non-Accountable Allowance",
        "amount": 300
      },
      {
        "date": 20,
        "type": "Embryo Transfer Fee",
        "amount": 1000
      }
    ],
    "May 2024": [
      {
        "date": 1,
        "type": "Main Pregnancy Compensation",
        "amount": 4180
      },
      {
        "date": 1,
        "type": "Monthly Non-Accountable Allowance",
        "amount": 300
      },
      {
        "date": 31,
        "type": "Maternity Clothing Allowance",
        "amount": 800
      }
    ],
    "Jun 2024": [
      {
        "date": 1,
        "type": "Main Pregnancy Compensation",
        "amount": 4180
      },
      {
        "date": 1,
        "type": "Monthly Non-Accountable Allowance",
        "amount": 300
      }
    ],
    "Jul 2024": [
      {
        "date": 1,
        "type": "Main Pregnancy Compensation",
        "amount": 4180
      },
      {
        "date": 1,
        "type": "Monthly Non-Accountable Allowance",
        "amount": 300
      },
      {
        "date": 19,
        "type": "Multiple Pregnancy Compensation",
        "amount": 7000
      }
    ],
    "Aug 2024": [
      {
        "date": 1,
        "type": "Main Pregnancy Compensation",
        "amount": 4180
      },
      {
        "date": 1,
        "type": "Monthly Non-Accountable Allowance",
        "amount": 300
      }
    ]
  },
  "uncertain_payments": [
    {
      "type": "Lost Wages",
      "amount": "TBD"
    },
    {
      "type": "Breast Milk",
      "amount": 300
    }
  ]
}

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
        {"certain_payments":["Jan 2022":[{"date":1,"type":"fee1","amount":10.00},{"type":"fee2","amount":10.00}],"Feb 2022":[{"date":12,"type":"fee2","amount":11.00}],...],"uncertain_payments":[{"type":"fee4","amount":100.00}],}
        
        JSON answers:`,
      },
    ];
    // Note: Ensure that the 'date' and 'type' fields in the JSON are formatted as strings, while the 'amount' field should always be in numerical format.


    const { lastChoice: sbpLastChoice } =
      await openAiChat(chat,1200);

    console.log(sbpLastChoice?.content);
    res.status(200).json({
      // sbpPaymentTabs: sbpLastChoice?.content.replace(/TBD/g, '0'),
      sbpPaymentTabs: JSON.stringify(fake2).replace(/TBD/g, '0'),
    });
  } catch (error: any) {
    res.status(500).end({
      message: "An unexpected error occurred please try again later",
    });
  }
}
