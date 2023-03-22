import {openai, openaiConfig} from "./openAiConfiguration";

export default async function simplifyDates(dates: string[]) {
    const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: `You are an intellectual assistant. Given a set of dates:
            ${JSON.stringify(dates)}` },
            { role: "user", content: `What are the dates that could be inferred or simplified into one single date?
            For example:
            Set of dates: [“3 days after happening of event a”, “5 weeks of event a”, “next month after 20 weeks of event a”, “next month of event b”]
            Response: {“date of event a”:[“3 days after happening of event a”, “5 weeks of event a”, “next month after 20 weeks of event a”]}
            JSON response ONLY:` },
        ],
        temperature: 0.01,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    // console.log(chatCompletion.data.choices[0].message);

    return chatCompletion.data.choices[0].message;
}