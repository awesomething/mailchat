import { PineconeClient } from '@pinecone-database/pinecone';
// 18A. TO GET OUR INDEX WORKING, WE NEED TO INITIALIZE & PROVIDE Pinecone Env Name, API Key & Index Name
if (!process.env.PINECONE_ENVIRONMENT || !process.env.PINECONE_API_KEY) {
    throw new Error('Pinecone environment or api key vars missing');
}
//18B. SEE DOCS https://python.langchain.com/docs/integrations/vectorstores/pinecone
async function initPinecone() {
    try {
        const pinecone = new PineconeClient();

        await pinecone.init({
            environment: process.env.PINECONE_ENVIRONMENT ?? '',
            apiKey: process.env.PINECONE_API_KEY ?? '',
        });


        return pinecone;
    } catch (error) {
        console.log('error', error);
        throw new Error('Failed to initialize Pinecone Client');
    }
}

export const pinecone = await initPinecone();