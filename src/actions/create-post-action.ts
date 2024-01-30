"use server";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import { z } from "zod";

const postFormSchema = z.object({
	parentId: z.string().uuid().or(z.string()),
	userId: z.string().uuid(),
	post: z
		.string()
		.min(1, "The post cannot be empty :(")
		.max(256, "The post exceed the limit of chars!"),
});

export default async function createPostAction(_prevError: string, formData: FormData) {
	const formEntries = Object.fromEntries(formData.entries());

	const parseResult = postFormSchema.safeParse(formEntries);

	if (!parseResult.success) {
		const { error } = parseResult;
		return error.issues[0].message;
	}

	const supabase = await createSupabaseServerClient(false);

	const { data: formValidate } = parseResult;
	const { parentId, userId, post } = formValidate;

	const { error, data: rowsInserted } = await supabase
		.from("posts")
		.insert({
			parent_id: parentId !== "null" ? parentId : null,
			user_id: userId,
			content: post,
		})
		.select();

	if (error) return "An unexpected error happened :(";

	const [newPost] = rowsInserted;
	const { id } = newPost;

	redirect(`/post/${id}`);
}
