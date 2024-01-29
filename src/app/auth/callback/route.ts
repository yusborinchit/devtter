import { createSupabaseServerClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const { searchParams, origin } = new URL(request.url);

	const code = searchParams.get("code");
	const next = searchParams.get("next") ?? "/";

	if (!code) return NextResponse.redirect(`${origin}/auth/auth-code-error`);

	const supabase = await createSupabaseServerClient(false);

	const { error } = await supabase.auth.exchangeCodeForSession(code);

	return error
		? NextResponse.redirect(`${origin}/auth/auth-code-error`)
		: NextResponse.redirect(`${origin}${next}`);
}
