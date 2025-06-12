'use client';
import Link from 'next/link';
import LoginButton from './LoginButton';

const Navbar = () => {

	// const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
	return (
		<nav className="bg-gray-800 p-4">
			<div className="container mx-auto flex justify-between items-center">
				<Link href="/" className="text-white text-xl font-bold">
					Logo
				</Link>
				<ul className="flex space-x-4">
					<li><Link href="/about" className="text-gray-300 hover:text-white">About</Link></li>
					<li><Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
					<li><Link href="/posts" className="text-gray-300 hover:text-white">posts</Link></li>
					<li><Link href="/users" className="text-gray-300 hover:text-white">Users</Link></li>
					{/* {token && <li><button onClick={() => {
						localStorage.removeItem('token'); // Clear token on logout
						window.location.href = '/'; // Redirect to home pages
					}} className="text-gray-300 hover:text-white">Logout</button></li>} */}
					{
						// <li><Link href="/login" className="text-gray-300 hover:text-white">Login</Link></li>
						<li><LoginButton /></li>
					}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;