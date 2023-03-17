import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);
const COMPLETIONS_MODEL = "text-davinci-003";
const EMBEDDING_MODEL = process.env.EMBEDDING_MODEL; //"text-embedding-ada-002"

const SEPARATOR = "\n* ";
// const ENCODING = "gpt2";
// const encoding = tiktoken.get_encoding(ENCODING)
const separatorLen = 4; //len(encoding.encode(SEPARATOR))

async function getEmbedding(text, model = EMBEDDING_MODEL) {
  const result = (
    await openai.createEmbedding({
      model,
      input: text,
    })
  ).data;
  return {
    embedding: result.data[0].embedding,
    tokenNum: result.usage.prompt_tokens,
  };
}

export async function computeDocEmbeddings(df) {
  const embeddings = {};
  await Promise.all(
    df.map(async (content) => {
      embeddings[content] = await getEmbedding(content);
    })
  );
  return embeddings;
}

function vectorSimilarity(x, y) {
  // Returns the similarity between two vectors.
  // Because OpenAI Embeddings are normalized to length 1, the cosine similarity is the same as the dot product.
  return x.reduce((acc, xi, i) => acc + xi * y[i], 0);
}

async function orderDocumentSectionsByQuerySimilarity(query, contexts) {
  const queryEmbedding = (await getEmbedding(query)).embedding;

  return Object.entries(contexts)
    .map(([content, docEmbedding]) => [
      vectorSimilarity(queryEmbedding, docEmbedding.embedding),
      docEmbedding.tokenNum,
      content,
    ])
    .sort(
      ([similarityA, tokensA, contentA], [similarityB, tokensB, contentB]) =>
        similarityB - similarityA
    );
}

export async function constructPrompt(
  question,
  contextEmbeddings,
  maxTokenLength = 1000
) {
  const mostRelevantDocumentSections =
    await orderDocumentSectionsByQuerySimilarity(question, contextEmbeddings);

  const chosenSections = [];
  let chosenSectionsLen = 0;

  for (const [_, tokensNum, content] of mostRelevantDocumentSections) {
    chosenSectionsLen += tokensNum + separatorLen;
    if (chosenSectionsLen > maxTokenLength) {
      break;
    }

    chosenSections.push(SEPARATOR + content.replace(/\n/g, " "));
  }

  return chosenSections;
  // Useful diagnostic information
  // console.log(`Selected ${chosenSections.length} document sections:`);
  // console.log(chosenSectionsIndexes.join("\n"));
  //
  // const header = `Answer the question as truthfully as possible using the provided context, and if the answer is not contained within the text below, say "I don't know."\n\nContext:\n`;
  //
  // return header + chosenSections.join("") + `\n\n Q: ${question}\n A:`;
}

//
//
// const processJSON=async ()=>{
//     let embedMap=await computeDocEmbeddings(["hello, hows it going","come on!","long long long text long long long text long long long text long long long text" +
//     " long long long text long long long text long long long text long long long text"+
//         " long long long text long long long text long long long text long long long text"+
//         " long long long text long long long text long long long text long long long text"+
//         " long long long text long long long text long long long text long long long text"+
//         " long long long text long long long text long long long text long long long text"]);
//     console.log(await constructPrompt("How long is the text?",embedMap));
// }
//
// processJSON();
