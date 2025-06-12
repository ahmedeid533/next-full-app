import { NextResponse } from 'next/server';
import clientPromise from "../../../../lib/mongodb";
export async function GET(request, { params }) {
	const { id } = await params;
	const client = await clientPromise;
	const db = client.db(process.env.MONGODB_DB); // replace with your DB name
	const post = await db.collection("posts").findOne({ id: parseInt(id) });
	if (!post) {
		return NextResponse.json({ error: 'Post not found' }, { status: 404 });
	}

	return NextResponse.json(post);
}