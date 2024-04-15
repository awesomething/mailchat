import {OpenAI} from "langchain/llms/openai";
import {pinecone} from "@/utils/pinecone-client"; // 19A. USE pinecone-client CODE IN HERE
import {PineconeStore} from "langchain/vectorstores/pinecone";
import {OpenAIEmbeddings} from "langchain/embeddings/openai";
import {ConversationalRetrievalQAChain} from "langchain/chains";
//REFER TO https://js.langchain.com/docs/modules/chains/popular/chat_vector_db 

async function initChain() {
    const model = new OpenAI({
        // @ts-ignore
        // apiKey: "OPENAI_API_KEY",
        // model: "gpt-35-turbo",
        // engine: "gpt-35-turbo"
    });// 15. CHOOSE YOUR MODEL

    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX ?? ''); //19B. THEN CONNECT IT TO INDEX

    /*20. Then create vectorstore and pass pinconeIndex below*/
    const vectorStore = await PineconeStore.fromExistingIndex(
        new OpenAIEmbeddings({}),
        {
            pineconeIndex: pineconeIndex,
            textKey: 'text',
        },
    );
//16. INITIALIZE THE CHAIN MODEL & VECTOR STORE AS THE RETRIEVER
    return ConversationalRetrievalQAChain.fromLLM(
        model,
        vectorStore.asRetriever(),
        {returnSourceDocuments: true} // 17. SET TO TRUE TO RETURN sourceDocuments
    );
}

export const chain = await initChain()