import type { Metadata } from "next";
import Head from "next/head";
import Link from "next/link";
import "@drop-in/graffiti";
import "./globals.css";
import { Chiron_GoRound_TC, Orbit } from "next/font/google";

const fontChiron = Chiron_GoRound_TC({
	weight: ["400", "500"],
	preload: false,
	variable: "--font-sans",
});

const fontOrbit = Orbit({
	weight: ["400"],
	preload: false,
	variable: "--font-orbit",
});

// const title = "Writing practice";
const title = "쓰기 연습";

export const metadata: Metadata = {
	title: title,
	description: "A collection of writing prompts for Korean study, graded by AI.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<Head>
				<title>{title}</title>
			</Head>
			<body className={[fontChiron.variable, fontOrbit.variable].join(" ")}>
				<header className="split">
					<h1 className="h3">
						<Link href="/">{title}</Link>
					</h1>
					<p className="end">
						A learning tool by <a href="https://ryelle.codes">ryelle.codes</a>
					</p>
				</header>
				<main className="container">
					<div className="page">{children}</div>
				</main>
			</body>
		</html>
	);
}
