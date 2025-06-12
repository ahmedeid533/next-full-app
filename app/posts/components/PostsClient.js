"use client";

import React, { useState } from "react";
import { useSession, } from "next-auth/react"


import Link from "next/link"; // Use Link for faster, client-side navigation.
import LoginButton from "../../components/LoginButton";

// This component now receives the initial posts as a prop.
export default function PostsClient({ initialPosts = [] }) {
	// Use NextAuth for session management.
	const { data: session, status } = useSession();
	const [posts, setPosts] = useState(initialPosts);
	const [showForm, setShowForm] = useState(false);
	const [form, setForm] = useState({
		title: "",
		content: "",
		author: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await fetch("/api/post", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(form),
		});

		if (res.ok) {
			const newPost = await res.json();
			// Add the new post to the top of the list for immediate feedback.
			setPosts((prev) => [...prev, newPost]);
			setForm({ title: "", content: "", author: "" });
			setShowForm(false);
		} else {
			// Handle errors from the API
			console.error("Failed to submit post");
		}
	};
	if (status === "loading") {
		return <div className="flex items-center justify-center h-64 text-xl">Loading...</div>;
	}
	if (status === "unauthenticated") {
		return (
			<div className="flex items-center justify-center h-64 text-xl">
				Please <LoginButton/> to view posts.
			</div>
		);
	}

	return (
		<div className="max-w-3xl mx-auto py-10 px-4">
			<h1 className="text-4xl font-extrabold mb-8 text-center text-blue-700 drop-shadow">
				Posts
			</h1>
			<div className="flex justify-end mb-6">
				<button
					className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
					onClick={() => setShowForm((v) => !v)}
				>
					{showForm ? "Cancel" : "Add Post"}
				</button>
			</div>
			{showForm && (
				<form
					onSubmit={handleSubmit}
					className="bg-blue-50 p-6 rounded-xl text-gray-800 shadow mb-8 space-y-4"
				>
					{/* Form inputs remain the same */}
					<div>
						<label className="block text-blue-800 font-semibold mb-1">
							Title
						</label>
						<input
							type="text"
							name="title"
							value={form.title}
							onChange={handleInputChange}
							required
							className="w-full px-3 py-2 border rounded"
						/>
					</div>
					<div>
						<label className="block text-blue-800 font-semibold mb-1">
							Content
						</label>
						<textarea
							name="content"
							value={form.content}
							onChange={handleInputChange}
							required
							className="w-full px-3 py-2 border rounded"
						/>
					</div>
					<div>
						<label className="block text-blue-800 font-semibold mb-1">
							Author
						</label>
						<input
							type="text"
							name="author"
							value={form.author}
							onChange={handleInputChange}
							required
							className="w-full px-3 py-2 border rounded"
						/>
					</div>
					<button
						type="submit"
						className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
					>
						Submit
					</button>
				</form>
			)}
			<ul className="space-y-6">
				{posts.map((post) => (
					// Using a <li> with a <Link> inside is better for accessibility
					<li
						key={post.id}
						className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow border border-blue-100"
					>
						<Link
							href={`/posts/${post.id}`}
							className="block cursor-pointer"
						>
							<div className="flex items-center mb-2">
								<span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full mr-2 font-mono">
									ID: {post.id}
								</span>
								<span className="ml-auto text-xs text-gray-400">
									{post.date}
								</span>
							</div>
							<h2 className="text-2xl font-bold text-blue-800 mb-2">
								{post.title}
							</h2>
							<p className="text-gray-700 mb-4">{post.content}</p>
							<div className="flex items-center">
								<span className="text-sm text-gray-500">
									Author:
								</span>
								<span className="ml-2 text-sm font-medium text-blue-600">
									{post.author}
								</span>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
