"use client";
import { useId, useState } from "react";
import styles from "./style.module.css";

interface Props {
	label: string;
	placeholder?: string;
	autofocus?: boolean;
	onSubmit: (value: string) => void;
}

export default function Prompt({
	label = "Prompt",
	placeholder = "",
	autofocus = false,
	onSubmit,
}: Props) {
	const [value, setValue] = useState("");
	const htmlId = useId();
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const trimmed = value.trim();
		if (!trimmed) {
			return;
		}
		if (trimmed.length > 500) {
			return;
		}
		if (/<script|javascript:|data:/i.test(trimmed)) {
			return;
		}
		onSubmit(trimmed);
		setValue("");
	};
	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<label htmlFor={htmlId} className="visually-hidden">
				{label}
			</label>
			<input
				id={htmlId}
				lang="ko-KR"
				type="text"
				className={styles.input}
				value={value}
				onChange={handleChange}
				placeholder={placeholder}
				autoFocus={autofocus}
			/>
			<button type="submit" className={styles.button} disabled={!value.length}>
				Check
			</button>
		</form>
	);
}
