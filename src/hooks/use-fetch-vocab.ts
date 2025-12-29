import { useState, useEffect } from "react";

export default function useFetchVocab(prompt: string | false) {
	const [data, setData] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		// Don't fetch if prompt is false or empty
		if (!prompt) {
			return;
		}

		const fetchVocab = async () => {
			try {
				setIsLoading(true);
				setError("");

				const response = await fetch("/api/vocab", {
					method: "POST",
					body: JSON.stringify({ prompt }),
					headers: {
						"Content-Type": "application/json",
					},
				});

				const result = await response.json();

				if (result.error) {
					throw new Error(result.error);
				}

				setData(result.result);
			} catch (err) {
				console.error("Fetch error:", err);
				setError(err instanceof Error ? err.message : "An error occurred");
			} finally {
				setIsLoading(false);
			}
		};

		fetchVocab();
	}, [prompt]);

	return { data, error, isLoading };
}
