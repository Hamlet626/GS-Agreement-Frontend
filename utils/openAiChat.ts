import { openai } from "./openAiConfiguration";

export default async function openAiChat(chat: any[]) {
  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: chat,
    temperature: 0.7,
    max_tokens: 3000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return {
    chat: [...chat, chatCompletion.data.choices[0].message],
    lastChoice: chatCompletion.data.choices[0].message,
  };
}
