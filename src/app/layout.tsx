import Header from "@/components/header";
import "@/styles/globals.css";
import { type Metadata } from "next";
import { Lexend } from "next/font/google";
import { type ReactNode } from "react";

const inter = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Devtter",
	description: "A Twitter clone built by Developers, for Developers.",
};

interface RootLayoutProps {
	children: ReactNode;
}

export default async function RootLayout({ children }: Readonly<RootLayoutProps>) {
	return (
		<html
			lang="en"
			className="scroll-smooth bg-neutral-950 font-light text-neutral-50 antialiased"
		>
			<body className={inter.className}>
				<Header />
				{children}
			</body>
		</html>
	);
}
