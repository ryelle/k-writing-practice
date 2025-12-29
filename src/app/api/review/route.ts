import { NextResponse } from "next/server";
import { generateText } from "ai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

export async function POST(req: Request) {
	const { input, prompt } = await req.json();

	const args = {
		baseURL: "https://api.upstage.ai/v1",
		name: "upstage",
		apiKey: process.env.UPSTAGEAI_API_KEY,
	};

	const result = await generateText({
		model: createOpenAICompatible(args).chatModel("solar-pro2"),
		system: "You are a Korean language tutor for an American student learning Korean. Do not ask any follow up questions when replying.",
		prompt: `Review the following sentence for grammar and vocabulary, and give the student a grade for how well the sentence matches the prompt.\nPrompt: ${prompt}\nSentence: ${input}`,
	});

	return NextResponse.json({ result, error: false });
}
