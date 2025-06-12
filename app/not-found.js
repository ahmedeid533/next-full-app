import Link from 'next/link'

export default function NotFound() {
	return (
		<div className="text-center py-10">
			<h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
			<p className="mb-6">Could not find the requested page.</p>
			<Link href="/" className="text-blue-500 hover:underline">
				Return Home
			</Link>
		</div>
	)
}