import { createSupabaseServerClient } from "@/lib/supabase-server";
import SignInButton from "./auth/sign-in-button";
import SingOutButton from "./auth/sign-out-button";

export default async function Header() {
	const supabase = await createSupabaseServerClient(true);

	const { data: sessionData } = await supabase.auth.getSession();
	const { session } = sessionData;

	return (
		<header className="mx-auto flex max-w-[480px] items-center px-4 py-3">
			<a
				href="/"
				className="flex items-center gap-1 text-xl leading-[1]"
			>
				<span className="font-black text-sky-400">{"{"}</span>
				<span className="font-bold tracking-tighter">Devtter</span>
				<span className="font-black text-sky-400">{"}"}</span>
			</a>

			<nav className="ml-auto flex items-center">
				{!session ? <SignInButton /> : <SingOutButton user={session.user} />}
			</nav>
		</header>
	);
}
