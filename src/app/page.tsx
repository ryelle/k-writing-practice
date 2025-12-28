"use client";
import { useState } from "react";
import Markdown from "react-markdown";

import Input from "./components/input";
import styles from "./page.module.css";
import prompts from "./prompts.json";

type SystemModelMessage = {
	role: "system";
	content: string;
};

type UserModelMessage = {
	role: "user";
	content: string;
};

type AssistantModelMessage = {
	role: "agent";
	content: string;
};

export default function Home() {
	const [vocab, setVocab] = useState("");

	const getVocab = () => {
		// fetch /api/vocab
		// {
		// 	"prompt": "Write about your favorite Korean food and why you like it."
		// }
		setVocab(
			"한국 음식, 비빔밥, 불고기, 김치, 떡볶이, 맛있다, 매콤하다, 달콤하다, 쫄깃하다, 고소하다, 건강하다, 특별하다, 추억, 가족, 전통, 재료, 상차림, 좋아하는, 이유, 맛, 향, 식감, 영양, 문화, 경험",
		);
	};

	const [messages, setMessages] = useState<
		Array<SystemModelMessage | UserModelMessage | AssistantModelMessage>
	>([]);

	const populateMessages = () => {
		setMessages([
			{
				role: "user",
				content: "저는 김치찌개를 맛 있어서 좋아해요",
			},
			{
				role: "agent",
				content:
					'Here’s the review of the sentence:  \n\n**Original Sentence:**  \n"저는 김치찌개를 맛 있어서 좋아해요."  \n\n**Grammar/Vocabulary Corrections:**  \n- The sentence is almost correct but has a minor grammatical error. The phrase "맛 있어서" is missing the adjective form "맛있는" (delicious).  \n- The correct sentence should be: **"저는 김치찌개가 맛있어서 좋아해요."**  \n  - Added **"가"** (topic marker) after "김치찌개" for proper sentence structure.  \n  - Changed **"맛 있어서"** to **"맛있는"** (delicious) + **"-어서"** (because) → **"맛있어서."**  \n\n**Grade:** B+  \nThe sentence is understandable and matches the prompt well, but the small grammatical error prevents it from being perfect. With the correction, it would be a strong example of describing a favorite Korean dish and the reason for liking it.  \n\n**Bonus Explanation:**  \n- "김치찌개" (Kimchi stew) is a great choice—it’s a popular Korean comfort food!  \n- To make the sentence more natural, you could also say: **"저는 김치찌개를 좋아해요. 김치의 매콤하고 깊은 맛이 좋기 때문이에요."** (I like Kimchi stew because of its spicy and rich flavor.)',
			},
		]);
	};

	return (
		<div>
			<div className={styles["initial-prompt"]}>
				<p>{prompts[0].prompt}</p>
				<p>{prompts[0].example}</p>
				{!vocab && !messages.length ? (
					<button onClick={getVocab}>Show possible vocabulary</button>
				) : null}
			</div>

			<div className={styles["message-list"]}>
				{vocab && (
					<>
						<div className={`${styles["message-item"]} ${styles["from-user"]}`}>
							<p>Show possible vocabulary</p>
						</div>
						<div className={`${styles["message-item"]} ${styles["from-agent"]}`}>
							<Markdown>{vocab}</Markdown>
						</div>
					</>
				)}
				{messages.map((message, i) => (
					<div
						className={`${styles["message-item"]} ${
							"agent" === message.role ? styles["from-agent"] : styles["from-user"]
						}`}
						key={i}
					>
						<Markdown>{message.content}</Markdown>
					</div>
				))}
			</div>

			<Input label="Response" onSubmit={populateMessages} />
		</div>
	);
}
