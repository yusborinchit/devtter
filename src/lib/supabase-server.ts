"use server";

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createSupabaseServerClient(serverComponent = false) {
	const cookieStore = cookies();

	return createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				get(name: string) {
					return cookieStore.get(name)?.value;
				},
				set(name: string, value: string, options: CookieOptions) {
					if (serverComponent) return;
					cookieStore.set({ name, value, ...options });
				},
				remove(name: string, options: CookieOptions) {
					if (serverComponent) return;
					cookieStore.set({ name, value: "", ...options });
				},
			},
		}
	);
}
