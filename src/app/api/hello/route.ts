import { NextResponse } from "next/server"

export async function GET() {
    console.log("hello")
    return NextResponse.json({"message": 'Hello, Next.js!'})
}