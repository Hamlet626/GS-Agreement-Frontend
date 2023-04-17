import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { openai, openaiConfig } from "../../utils/openAiConfiguration";
import openAiChat from "../../utils/openAiChat";

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

apiRoute.post(async (req: NextApiRequest, res: NextApiResponse) => {
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
    const completion = await openAiChat([
      {role:"system",content:"You are a helpful lawyer who stipulated surrogacy documents. Given a cited paragraph from a contract:\n" +
            req.body.text  },
      {role:"user",content:"I'm a philistine with this contract. Explain this paragraph to me by simple words.\n" +
            "Explanation only on this part in short:"},
    ],1000);
    // const completion = await openai.createCompletion({
    //   model: "text-davinci-003",
    //   prompt: `Explain this cited paragraph form a legal contract agreement to a philistine by simple words.
    //            Citation: ${req.body.text}
    //            Explanation in short:`,
    //   temperature: 0.1,
    //   max_tokens: 1000,
    //   top_p:1,
    // });

    res.status(200).json({ result: completion.lastChoice?.content });
  } catch (error: any) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
});

export default apiRoute;
