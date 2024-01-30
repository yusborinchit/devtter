"use client";

import createPostAction from "@/actions/create-post-action";
import { Send } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useFormState } from "react-dom";

const POST_MAX_LENGTH = 256;

interface PostFormProps {
	userId: string;
	parentId: string | null;
}

export default function PostForm({ userId, parentId }: PostFormProps) {
	const [error, action] = useFormState(createPostAction, "");
	const [form, setForm] = useState({
		post: "",
		length: 0,
	});

	const isTooLarge = form.length > 256;

	function handlePostChange({ currentTarget }: ChangeEvent<HTMLTextAreaElement>) {
		const post = currentTarget.value;
		setForm({ post: post, length: post.length });
	}

	return (
		<form
			action={action}
			className="flex flex-col gap-1"
		>
			{/* - hidden data */}
			<input
				type="hidden"
				name="parentId"
				value={parentId ? parentId : "null"}
			/>
			<input
				type="hidden"
				name="userId"
				value={userId}
			/>
			{/* - hidden data */}

			<header className="flex items-center">
				<label
					htmlFor="post"
					className="text-xs font-bold"
				>
					What&apos;s new?:
				</label>
				<p
					data-too-large={isTooLarge}
					className="ml-auto text-xs text-neutral-500 data-[too-large=true]:text-red-500"
				>
					{form.length}/{POST_MAX_LENGTH}
				</p>
			</header>
			<div
				data-too-large={isTooLarge}
				className="flex flex-col rounded border border-neutral-700 bg-neutral-900 data-[too-large=true]:border-red-500"
			>
				<textarea
					id="post"
					name="post"
					value={form.post}
					onChange={handlePostChange}
					rows={7}
					placeholder="Hello world from Devtter..."
					className="resize-none rounded border-none bg-transparent p-2 text-sm placeholder:text-neutral-500 focus-within:ring-0"
				></textarea>
				<footer className="flex items-center justify-end">
					<button
						data-too-large={isTooLarge}
						aria-label="Send post"
						className="grid place-items-center p-2 hover:text-sky-400 data-[too-large=true]:hover:text-red-500"
					>
						<Send
							width={20}
							height={20}
						/>
					</button>
				</footer>
			</div>
			<p className="text-sm text-red-500">{error}</p>
		</form>
	);
}
