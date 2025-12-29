import { NextResponse } from "next/server";
import { generateText } from "ai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

export async function POST(req: Request) {
	const { prompt } = await req.json();
	const args = {
		baseURL: "https://api.upstage.ai/v1",
		name: "upstage",
		apiKey: process.env.UPSTAGEAI_API_KEY,
	};

	const result = await generateText({
		model: createOpenAICompatible(args).chatModel("solar-pro2"),
		system: "You are a Korean language tutor for an American student learning Korean. Do not ask any follow up questions when replying.",
		prompt: `Generate some vocabulary for a student to use when replying to this prompt. Only return the words in Korean. Do not conjugate any verbs.\nPrompt: ${prompt}`,
	});

	return NextResponse.json({ result: result.output, error: false });
}
