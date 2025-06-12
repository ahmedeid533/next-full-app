import UserCard from '../components/UserCard';

async function getUsers() {
	// Adding a delay to simulate a slow network connection
	await new Promise(resolve => setTimeout(resolve, 2000));
	const res = await fetch('https://jsonplaceholder.typicode.com/users');

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error('Failed to fetch data');
	}

	return res.json();
}

export const metadata = {
	title: 'Users - Next.js Lab',
};

export default async function UsersPage() {
	const users = await getUsers();

	return (
		<div>
			<h1 className="text-3xl font-bold mb-6">Users</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{users.map(user => (
					<UserCard key={user.id} user={user} />
				))}
			</div>
		</div>
	);
}