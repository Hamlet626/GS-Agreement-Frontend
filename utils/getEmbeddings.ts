import { openai } from "./openAiConfiguration";

interface IEmbeddingData {
  embedding: number[];
  tokenNum: number;
  text: string
}

async function getEmbedding(text: string): Promise<IEmbeddingData> {
  const result = (
    await openai.createEmbedding({
      model: 'text-embedding-ada-002',
      input: text,
    })
  ).data;

  return {
    embedding: result.data[0].embedding,
    tokenNum: result.usage.prompt_tokens!,
    text
  };
}

const embedStrings = async (stringsArray: string[]) => {
  const embeddingsDB = await Promise.all(
    stringsArray.map(async (string) => {
      const embedding = await getEmbedding(string);
      return { string, embedding };
    })
  );
  return embeddingsDB;
};

// const searchEmbeddings = async (query: string, embeddingsDB: any) => {
//   const queryEmbedding = await getEmbedding(query);
//   let bestMatch = null;
//   let bestScore = -Infinity;
//   for (const { string, embedding } of embeddingsDB) {
//     const similarity = await openai.computeSimilarity({
//       vector1: queryEmbedding,
//       vector2: embedding,
//     });
//     if (similarity > bestScore) {
//       bestMatch = string;
//       bestScore = similarity;
//     }
//   }
//   return bestMatch;
// };

// async function embedStrings(strings, engine = 'text-embedding-ada-002') {
//   const embeddingsDB = [];
//   const embeddings = await Promise.all(strings.map((str) => getEmbedding(str, { engine })));
//   embeddings.forEach((embedding, index) => {
//     embeddingsDB.push({ string: strings[index], embedding });
//   });
//   return embeddingsDB;
// }

export async function searchEmbeddings(query: string, embeddingsDB: any) {
  const queryEmbedding = await getEmbedding(query);
  let bestMatch = null;
  let bestMatchScore = -Infinity;
  embeddingsDB.forEach(({ string, embedding }: any) => {
    const score = queryEmbedding.cosineSimilarity(embedding);
    if (score > bestMatchScore) {
      bestMatch = string;
      bestMatchScore = score;
    }
  });
  return bestMatch;
}
