import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Providers } from './providers'
import './globals.css';

export const metadata = {
	title: 'Next.js Lab Project',
	description: 'A sample project for learning Next.js fundamentals.',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" foxified="">
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
			</head>
			<body className="flex flex-col min-h-screen">
				<Providers>
					<Navbar />
					<main className="flex-grow container mx-auto px-4 py-8">
						{children}
					</main>
					<Footer />
				</Providers>
			</body>
		</html>
	);
}