import { streamText, UIMessage, convertToModelMessages } from "ai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

export async function POST(req: Request) {
	const { messages, prompt }: { messages: UIMessage[]; prompt: string } = await req.json();
	const args = {
		baseURL: "https://api.upstage.ai/v1",
		name: "upstage",
		apiKey: process.env.UPSTAGEAI_API_KEY,
	};

	const result = streamText({
		model: createOpenAICompatible(args).chatModel("solar-pro2"),
		system: `You are a Korean language tutor for an American student learning Korean. The student will send sentences based on this prompt: ${prompt}\nOffer feedback on the sentence in English if relevant, and give a grade for the attempt.\nDo not ask any follow up questions when replying. Do not romanize Korean.`,
		messages: await convertToModelMessages(messages),
	});

	return result.toUIMessageStreamResponse();
}
