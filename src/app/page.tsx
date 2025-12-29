"use client";
import { useState } from "react";
import { DefaultChatTransport } from "ai";
import { useChat } from "@ai-sdk/react";
import Input from "@/app/components/input";
import useFetchVocab from "@/app/hooks/use-fetch-vocab";
import styles from "./page.module.css";
import prompts from "./prompts.json";
import { MemoizedMarkdown } from "@/app/components/memoized-markdown";

const PROMPT = prompts[Math.floor(Math.random() * prompts.length)];

export default function Home() {
	const prompt = PROMPT.prompt;
	const { messages, sendMessage } = useChat({
		transport: new DefaultChatTransport({
			api: "/api/review",
			// Send prompt along with message history.
			body: { prompt },
		}),
	});
	const [shouldFetchVocab, setShouldFetchVocab] = useState(false);
	const { data: vocab, isLoading: isVocabLoading } = useFetchVocab(
		shouldFetchVocab ? prompt : false,
	);
	const getVocab = () => setShouldFetchVocab(true);
	const handleSubmit = (text: string) => sendMessage({ text });

	return (
		<div>
			<div className={styles["initial-prompt"]}>
				<p>{PROMPT.prompt}</p>
				<p>{PROMPT.example}</p>
				{!vocab && !isVocabLoading && !messages.length ? (
					<button onClick={getVocab}>Show possible vocabulary</button>
				) : null}
			</div>

			<div className={styles["message-list"]}>
				{(vocab || isVocabLoading) && (
					<>
						<div className={`${styles["message-item"]} ${styles["from-user"]}`}>
							<p>Show possible vocabulary</p>
						</div>
						{isVocabLoading ? (
							<div className={`${styles["message-item"]} ${styles["from-agent"]}`}>
								…
							</div>
						) : (
							<div className={`${styles["message-item"]} ${styles["from-agent"]}`}>
								<MemoizedMarkdown id="vocab" content={vocab} />
							</div>
						)}
					</>
				)}
				{messages.map((message, i) => (
					<div
						className={`${styles["message-item"]} ${
							"user" === message.role ? styles["from-user"] : styles["from-agent"]
						}`}
						key={i}
					>
						<>
							{message.parts.map((part) => {
								switch (part.type) {
									case "text":
										return (
											<MemoizedMarkdown
												key={`${message.id}-text`}
												id={message.id}
												content={part.text}
											/>
										);
								}
							})}
						</>
					</div>
				))}
			</div>

			<Input label="Response" onSubmit={handleSubmit} />
		</div>
	);
}
