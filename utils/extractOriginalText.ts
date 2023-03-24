import {encoding_for_model} from "@dqbd/tiktoken";
// @ts-ignore
import { computeDocEmbeddings, constructPrompt } from "openai_embedding";

const maxTokens = 4096-1200-360;
export async function extractOriginalText(file: string) {
    const encoding = encoding_for_model("gpt-3.5-turbo");

    const tokens= encoding.encode(file);
    const tokenNum = tokens.length;
    if(tokenNum<=maxTokens)return file;
    const secNum = Math.ceil(tokenNum / maxTokens);

    let sections: string[] = [];
    for(let i=0;i<secNum;i++){
        const start = Math.floor(tokenNum*i/secNum);
        const sec = tokens.slice(start,start+maxTokens-1);
        const secText = new TextDecoder().decode(encoding.decode(sec));
        sections.push(secText);
    }

    let embeddings= await computeDocEmbeddings(sections);
    let choices= await constructPrompt("list every fee detail including date, amount, and dependency in different situation",embeddings,99999000);
    return choices[0];
}