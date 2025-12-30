import Link from "next/link";
import type { PromptType } from "@/types";
import Chat from "@/components/chat";
import prompts from "../prompts.json";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	const id = Number((await params).id);
	const prompt: PromptType | undefined = prompts[id];
	const hasPrev = id > 0;
	const hasNext = id < prompts.length - 1;

	return (
		<div>
			{prompt && <Chat prompt={prompt} />}
			<footer className="split">
				{hasPrev ? (
					<p>
						<Link href={`/${id - 1}`}>Previous</Link>
					</p>
				) : (
					<span />
				)}
				{hasNext && (
					<p>
						<Link href={`/${id + 1}`}>Next</Link>
					</p>
				)}
			</footer>
		</div>
	);
}
