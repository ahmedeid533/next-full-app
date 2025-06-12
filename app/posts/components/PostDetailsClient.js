'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react"
import LoginButton from '../../components/LoginButton';


export default function PostDetailsClient({ initialPost }) {
	// Use NextAuth for session management.
	const { data: session, status } = useSession();
	const router = useRouter();
	const [post, setPost] = useState(initialPost);
	const [editMode, setEditMode] = useState(false);

	// Initialize form state with the initial post data.
	const [form, setForm] = useState({
		title: initialPost?.title || '',
		content: initialPost?.content || '',
	});

	// Since data is pre-fetched, a loading state is only needed for actions.
	// The initial loading state from the original code is no longer necessary.

	const handleDelete = async () => {
		// IMPORTANT: window.confirm() can be unreliable in some environments.
		// For a real app, you would build a custom modal component for confirmations.
		// For this example, we'll proceed with the delete.
		const res = await fetch(`/api/post?id=${post.id}`, { method: 'DELETE' });
		if (res.ok) {
			router.push('/posts');
		} else {
			console.error("Failed to delete the post.");
		}
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		const res = await fetch(`/api/post?id=${post.id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(form),
		});
		if (res.ok) {
			const updated = await res.json();
			setPost(updated);
			setEditMode(false);
		} else {
			console.error("Failed to update the post.");
		}
	};

	// If the session is loading, show a loading state.
	if (status === 'loading') {
		return <div className="flex items-center justify-center h-64 text-xl">Loading...</div>;
	}
	// If the user is not authenticated, show a message.
	if (status === 'unauthenticated') {
		return (
			<div className="flex items-center justify-center h-64 text-xl">
				Please <LoginButton/> to view this post.
			</div>
		);
	}


	// If the initial fetch on the server failed, initialPost will be null.
	if (!post) {
		return <div className="flex items-center justify-center h-64 text-xl text-red-500">Post not found.</div>;
	}


	return (
		<div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
			{editMode ? (
				<form onSubmit={handleUpdate} className="space-y-6 text-gray-700">
					<input
						type="text"
						value={form.title}
						onChange={e => setForm({ ...form, title: e.target.value })}
						required
						className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
						placeholder="Title"
					/>
					<textarea
						value={form.content}
						onChange={e => setForm({ ...form, content: e.target.value })}
						required
						className="w-full px-4 py-2 border  border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
						rows={6}
						placeholder="Body"
					/>
					<div className="flex gap-4">
						<button
							type="submit"
							className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition"
						>
							Update
						</button>
						<button
							type="button"
							onClick={() => setEditMode(false)}
							className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-2 rounded transition"
						>
							Cancel
						</button>
					</div>
				</form>
			) : (
				<>
					<h1 className="text-3xl font-bold mb-4 text-gray-800">{post.title}</h1>
					<p className="text-lg text-gray-700 mb-8 whitespace-pre-line">{post.content}</p>
					<div className="flex gap-4">
						<button
							onClick={() => setEditMode(true)}
							className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-2 rounded transition"
						>
							Edit
						</button>
						<button
							onClick={handleDelete}
							className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded transition"
						>
							Delete
						</button>
					</div>
				</>
			)}
		</div>
	);
}
