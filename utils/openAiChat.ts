import { openai } from "./openAiConfiguration";

export default async function openAiChat(
  chat: any[],
  max_tokens: number = 600
) {
  try {
    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chat,
      temperature: 0.01,
      max_tokens: max_tokens,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return {
      chat: [...chat, chatCompletion.data.choices[0].message],
      lastChoice: chatCompletion.data.choices[0].message,
    };
  } catch (error: any) {
    console.log(error.response.data.error);
    throw `error: ${error}`;
  }
}
