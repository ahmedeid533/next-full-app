export default function PostsLayout({ children }) {
	return (
		<div style={{ padding: '2rem'}}>
			<h1>Posts layout</h1>
			<main className="min-h-[60vh]">{children}</main>
			<footer style={{ marginTop: '2rem', textAlign: 'center' }}>
				<p>© 2025 My Blog</p>
			</footer>
		</div>
	);
}