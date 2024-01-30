import Header from "@/components/header";
import "@/styles/globals.css";
import { type Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { type ReactNode } from "react";

const plus_jakarta_sans = Plus_Jakarta_Sans({ subsets: ["latin"] });

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
			className="scroll-smooth bg-neutral-950 text-neutral-50 antialiased"
		>
			<body className={plus_jakarta_sans.className}>
				<Header />
				{children}
			</body>
		</html>
	);
}
