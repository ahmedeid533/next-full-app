import PostsClient from "./components/PostsClient";


// This is a Server Component, so we can export metadata.
export const metadata = {
	title: "All Posts | My Blog",
	description: "Browse our collection of posts or add your own.",
};

// Data is fetched on the server at build time or request time.
async function getPosts() {
	// Use the full URL for server-side fetching.
	// Replace with your actual domain in production.
	const res = await fetch(`http://localhost:3000/api/post`, {
		// 'no-store' ensures the data is always fresh on each request.
		// For better performance, you could use revalidation: next: { revalidate: 60 }
		cache: "no-store",
	});

	if (!res.ok) {
		// This will be caught by the nearest error.js file.
		throw new Error("Failed to fetch posts");
	}
	return res.json();
}

export default async function PostsPage() {
	// 1. Fetch data on the server.
	const initialPosts = await getPosts();

	// 2. Pass the fetched data as a prop to the Client Component.
	return <PostsClient initialPosts={initialPosts} />;
}
