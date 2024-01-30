import PostForm from "@/components/posts/post-form";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function Home() {
	const supabase = await createSupabaseServerClient(true);

	const { data: sessionData } = await supabase.auth.getSession();
	const { session } = sessionData;

	return (
		<main className="mx-auto mt-3 flex max-w-[480px] flex-col gap-4 px-4">
			{session && <PostForm parentId={null} userId={session.user.id} />}
		</main>
	);
}
