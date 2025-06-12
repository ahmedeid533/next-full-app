const UserCard = ({ user }) => {
	return (
		<div className="bg-white shadow-lg rounded-lg p-6">
			<h2 className="text-xl text-gray-800 font-bold mb-2">{user.name}</h2>
			<p className="text-gray-700 mb-1"><strong>Username:</strong> {user.username}</p>
			<p className="text-gray-700 mb-1"><strong>Email:</strong> {user.email}</p>
			<p className="text-gray-700"><strong>Website:</strong> {user.website}</p>
		</div>
	);
};

export default UserCard;