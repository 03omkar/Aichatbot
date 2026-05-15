import connectdb from "@/app/lib/db";
import Settings from "@/model/settings.model";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try{
        const{message,ownerId}=await req.json()
        if(!message || !ownerId){
            return NextResponse.json(
                {message:"message and ownerId is required"},
                {status:400}
            )
        }
        await connectdb()
        const setting=await Settings.findOne({ownerId})
        if(!setting){
            return NextResponse.json(
            {message:"Chatbot is not confiqured"},
                {status:400})

        }
        const KNOWLEDGE =`
        business name-${setting.businessname || "not provided"}
        support email-${setting.supportemail || "not provided"}
        knowledge-${setting.knowledge || "not provided"}`

        const prompt=`You are a professional AI customer support assistant for a business.

Your job is to answer user queries ONLY using the provided knowledge base.

Guidelines:
- Use the knowledge base as the single source of truth.
- Do NOT make up information.
- If the answer is not found in the knowledge base, say:
  "I'm sorry, I couldn't find that information. Please contact support."
- Keep answers clear, concise, and helpful.
- Be polite and professional at all times.
- If relevant, format answers in bullet points for clarity.
- Do not mention "knowledge base" in your response.

Business Information:
 ${KNOWLEDGE}
 custoer question:
 ${message}

`;
const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});
const res = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
});

const response = NextResponse.json({
    message: String(res.text)
})
  response.headers.set("Access-control-Allow-origin","*");
  response.headers.set("Access-control-Allow-Methods","POST,OPTIONS");
  response.headers.set("Access-control-Allow-headers","Content-type");
  return response

        

}
    catch(error){
        const response= NextResponse.json(
            {message:`Chat error ${error}`},
                {status:500})
                response.headers.set("Access-control-Allow-origin","*");
  response.headers.set("Access-control-Allow-Methods","POST,OPTIONS");
  response.headers.set("Access-control-Allow-headers","Content-type");
  return response


    }
    
}
export const OPTIONS=async()=>{
    return NextResponse.json(null,{
        status:201,
        headers:{"Access-control-Allow-origin":"*",
  "Access-control-Allow-Methods":"POST,OPTIONS",
  "Access-control-Allow-headers":"Content-type",

        }
    })
}