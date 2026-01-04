"use client";
import { useState } from "react";
import { DefaultChatTransport } from "ai";
import { useChat } from "@ai-sdk/react";
import Input from "@/components/input";
import useFetchVocab from "@/hooks/use-fetch-vocab";
import { MemoizedMarkdown } from "@/components/memoized-markdown";
import { PromptType } from "@/types";
import styles from "./style.module.css";

export default function Chat({ prompt: { prompt, example } }: { prompt: PromptType }) {
	const { messages, sendMessage } = useChat({
		transport: new DefaultChatTransport({
			api: "/api/review",
			// Send prompt along with message history.
			body: { prompt: prompt },
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
				<p>{prompt}</p>
				<p>{example}</p>
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
							<div
								className={`${styles["message-item"]} ${styles["from-agent"]}`}
								lang="ko"
							>
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
						lang="ko"
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
