import { NextResponse } from 'next/server';
import {chain} from "@/utils/chain"; // 13 CHAIN HAS BEEN INITIALIZED IN THIS FILE
import {Message} from "@/types/message";

export async function POST(request: Request) {//11. THIS IS WHAT WE CALL WHEN WE RUN HANDLECLICK FUNCTION

    const body = await request.json();
    const question: string = body.query;
    const history: Message[] = body.history ?? []

//See more to create vectordb using vscode
    const res = await chain.call({ //https://js.langchain.com/docs/modules/chains/popular/chat_vector_db 
        //12. ONCE CALL IS MADE, WE 1ST RECIEVE OUR MESSAGE & HISTORY
            question: question,
            chat_history: history.map(h => h.content).join("\n"),
        });

    //13. console.log(res) TO SEE A sourceDocuments[] ARRAY IN YOUR LOGS-SHOWING WHERE LARGE CHUNKS OF DATA(Document {}) AS CONTEXT TO LLMs
    // console.log(res.sourceDocuments)

    //14a. EXTRACT LINKS FROM THE sourceDocuments and ..
    const links: string[] = Array.from(new Set(res.sourceDocuments.map((document: {metadata: {source: string}}) => document.metadata.source)))
    //14b RETURN ANS IN MESSAGE FORMATS
    return NextResponse.json({role: "assistant", content: res.text, links: links})
}
