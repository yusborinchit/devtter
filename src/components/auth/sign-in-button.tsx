"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { LogIn } from "lucide-react";

export default function SignInButton() {
	const supabase = createSupabaseBrowserClient();

	async function handleSignIn() {
		const { error } = await supabase.auth.signInWithOAuth({
			provider: "github",
			options: {
				redirectTo: `http://localhost:3000/auth/callback/`,
			},
		});

		if (error) return alert("Oops! Something bad happened.");
	}

	return (
		<button
			onClick={handleSignIn}
			className="flex items-center gap-1 rounded bg-gradient-to-t from-sky-600 to-sky-400 px-3 py-2 text-sm font-semibold capitalize"
		>
			<LogIn
				strokeWidth={2.5}
				width={16}
				height={16}
			/>
			<span>Sign in</span>
		</button>
	);
}
