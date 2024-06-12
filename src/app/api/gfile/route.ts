
const { formidable } = require('formidable');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

import { NextResponse } from "next/server"

type Chat = {
    message?: string,
}

export async function POST(request: Request) {
    const data: Chat = await request.json()
    console.log("Anyone there")
    const text = "temp"
    return NextResponse.json({"message": text})
}