import { openai } from "./openAiConfiguration";
  // @ts-ignore
  import { intoParagraphs } from "openai_embedding";

const SEPARATOR = "\n* ";
const separatorLength = 4;

interface IEmbeddingData {
  embedding: number[];
  tokenNum: number;
  text: string;
}

async function getEmbedding(text: string): Promise<IEmbeddingData> {
  const result = (
    await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: text,
    })
  ).data;

  return {
    embedding: result.data[0].embedding,
    tokenNum: result.usage.prompt_tokens!,
    text,
  };
}

// function separateTextInParagraphsArray(bigString: string) {
//   const separator = "\n\n";
//   const regex = new RegExp(`(${separator})+`);
//   const nastyArray = bigString.split(regex);
//   return nastyArray.filter((string) => !string.startsWith("\n\n"));
// }

export async function computeDocEmbeddings(
  bigString: string
): Promise<IEmbeddingData[]> {
  const paragraphsArray: string[] = await intoParagraphs({ raw: bigString, maxtoken: 400 });

  const embeddingsDB = await Promise.all(
    paragraphsArray.map(async (string) => {
      return await getEmbedding(string);
    })
  );

  return embeddingsDB;
}

function vectorSimilarity(x: number[], y: number[]): number {
  return x.reduce((acc, xi, i) => acc + xi * y[i], 0);
}

async function orderDocumentSectionsByQuerySimilarity(
  query: string,
  contexts: IEmbeddingData[]
): Promise<any> {
  const queryEmbedding = (await getEmbedding(query)).embedding;

  return contexts
    .map((docEmbedding) => [
      vectorSimilarity(queryEmbedding, docEmbedding.embedding),
      docEmbedding.tokenNum,
      docEmbedding.text,
    ])
    .sort(
      ([similarityA], [similarityB]) =>
        Number(similarityB) - Number(similarityA)
    );
}

export async function constructPrompt(
  question: string,
  contextEmbeddings:IEmbeddingData[],
  maxTokenLength = 1000
): Promise<string[]> {
  const mostRelevantDocumentSections =
    await orderDocumentSectionsByQuerySimilarity(question, contextEmbeddings);

  const chosenSections: string[] = [];
  let chosenSectionsLength = 0;

  for (const [_, tokensNum, content] of mostRelevantDocumentSections) {
    chosenSectionsLength += tokensNum + separatorLength;
    if (chosenSectionsLength > maxTokenLength) {
      break;
    }

    chosenSections.push(SEPARATOR + content.replace(/\n/g, " "));
  }
  
  return chosenSections;
}
