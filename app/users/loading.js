export default function Loading() {
	// You can add any UI inside Loading, including a Skeleton.
	return (
		<div>
			<h1 className="text-3xl font-bold mb-6">Users</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{/* Skeleton loader for each card */}
				{[...Array(6)].map((_, i) => (
					<div key={i} className="bg-white shadow-lg rounded-lg p-6 animate-pulse">
						<div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
						<div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
						<div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
						<div className="h-4 bg-gray-300 rounded w-1/3"></div>
					</div>
				))}
			</div>
		</div>
	)
}