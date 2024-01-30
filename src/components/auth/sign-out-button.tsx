"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { type User } from "@supabase/supabase-js";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SignOutButtonProps {
	user: User;
}

export default function SingOutButton({ user }: Readonly<SignOutButtonProps>) {
	const supabase = createSupabaseBrowserClient();
	const router = useRouter();

	async function handleSignOut() {
		const { error } = await supabase.auth.signOut();

		if (error) return alert("Oops! Something bad happened.");

		router.refresh();
	}

	return (
		<button
			onClick={handleSignOut}
			className="rounded"
		>
			<Image
				src={user.user_metadata.avatar_url}
				width={36}
				height={36}
				alt={`${user.user_metadata.user_name} profile picture.`}
				className="rounded-full"
			/>
		</button>
	);
}
