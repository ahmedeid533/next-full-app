import PostDetailsClient from '../components/PostDetailsClient';

async function getPost(id) {
	// Use the full URL for server-side fetching.
	const res = await fetch(`http://localhost:3000/api/post/${id}`, {
		cache: 'no-store',
	});

	if (!res.ok) {
		return null;
	}
	return res.json();
}

// generateMetadata runs on the server to create dynamic metadata for SEO.
export async function generateMetadata({ params }) {
	const { id } = await params;
	const post = await getPost(id);
	if (!post) {
		return {
			title: 'Post Not Found',
		};
	}

	return {
		title: post.title,
		description: post.content?.slice(0, 150) || 'Post details',
	};
}


// This is the main page component.
export default async function PostPage({ params }) {
	// 1. Fetch the data on the server.
	const { id } = await params;

	const initialPost = await getPost(id);

	// 2. Pass the fetched data as a prop to the Client Component.
	return <PostDetailsClient initialPost={initialPost} />;
}
