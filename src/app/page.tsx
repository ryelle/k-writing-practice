import Link from "next/link";
import prompts from "./prompts.json";
import styles from "./page.module.css";

export default function Home() {
	return (
		<div>
			<h2 className="h4">Available prompts</h2>
			<ul className={styles.list}>
				{prompts.map(({ level, prompt }, i) => (
					<li key={i}>
						<span className={styles[`level-${level}`]} />
						<Link href={`/${i}/`}>{prompt}</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
