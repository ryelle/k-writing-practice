import { NextResponse } from "next/server";
import { generateText } from "ai";
// import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { google } from "@ai-sdk/google";
import LRUCache from "@/utils/cache";

const cache = new LRUCache<string, string>(500);

export async function POST(req: Request) {
	const { prompt } = await req.json();
	// const args = {
	// 	baseURL: "https://api.upstage.ai/v1",
	// 	name: "upstage",
	// 	apiKey: process.env.UPSTAGEAI_API_KEY,
	// };

	const key = `vocab::${prompt}`;

	// Check cache first
	if (cache.has(key)) {
		console.log(`Cache hit for ${prompt}.`);
		const output = cache.get(key);
		if (typeof output === "string") {
			return NextResponse.json({ result: output, error: false });
		}
	}

	console.log(`Cache miss for ${prompt}.`);
	// const model = createOpenAICompatible(args).chatModel("solar-pro2"),
	const model = google("gemini-2.5-pro");
	const result = await generateText({
		model,
		system: "You are a Korean language tutor for an American student learning Korean. Do not ask any follow up questions when replying.",
		prompt: `Generate 10-20 vocabulary words in a comma-separated list for a student to use when replying to this prompt. Only return the words in Korean. Do not conjugate any verbs.\nPrompt: ${prompt}`,
	});

	const output = result.output;
	cache.set(key, output);
	return NextResponse.json({ result: output, error: false });
}
