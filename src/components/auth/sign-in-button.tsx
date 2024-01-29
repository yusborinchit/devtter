"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

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
			className="rounded bg-gradient-to-t from-sky-700 to-sky-400 px-3 py-2 text-xs font-semibold capitalize"
		>
			Sign in
		</button>
	);
}
