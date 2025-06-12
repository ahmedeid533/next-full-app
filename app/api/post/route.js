import clientPromise from "../../../lib/mongodb"; // Adjust the path as needed
import { NextResponse } from 'next/server';
export async function GET(request) {
	try {
		const client = await clientPromise;
		const db = client.db(process.env.MONGODB_DB);
		const items = await db
			.collection("posts")
			.find({})
			.toArray();
		return NextResponse.json(items);
	} catch (e) {
		console.error(e);
		return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
	}
}

export async function POST(request) {
	const body = await request.json();
	// Here you would typically save the post to mongo database
	const client = await clientPromise;
	const db = client.db(process.env.MONGODB_DB);
	const post = await db
		.collection("posts")
		.find({})
		.sort({ _id: -1 })
		.limit(1).toArray();
	const body_ = {
		...body,
		id: post[0].id + 1, // Simple ID generation, you might want to use a better method
		date : new Date().toISOString().split("T")[0], // Format date as YYYY-MM-DD
	};
	// Save the post to the database
	const result = await db.collection("posts").insertOne(body_);

	// mow return the newly created post
	return NextResponse.json(body_, {
		status: 201,
		headers: { "Content-Type": "application/json" }
	});
}
export async function PUT(request) {
	const body = await request.json();
	const url = new URL(request.url);
	const id = url.searchParams.get("id");

	if (!id) {
		return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
	}

	try {
		const client = await clientPromise;
		const db = client.db(process.env.MONGODB_DB);
		// Update the post in the database
		const result = await db.collection("posts").findOneAndUpdate(
			{ id: parseInt(id) },
			{ $set: { content: body.content, title: body.title } },
			{ returnDocument: "after" } // For MongoDB Node.js driver v4+, this is correct. If using v3.x, use { returnOriginal: false }
		);
		console.log("result ==> ", result);

		if (!result) {
			return NextResponse.json({ error: "Post not found" }, { status: 404 });
		}

		return NextResponse.json(result, {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (e) {
		console.error(e);
		return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
	}
}
export async function DELETE(request) {
	const url = new URL(request.url);
	const id = url.searchParams.get("id");

	if (!id) {
		return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
	}

	try {
		const client = await clientPromise;
		const db = client.db(process.env.MONGODB_DB);

		const result = await db.collection("posts").deleteOne({ id: parseInt(id) });

		if (result.deletedCount === 0) {
			return NextResponse.json({ error: "Post not found" }, { status: 404 });
		}

		return NextResponse.json({ message: `Post with id ${id} deleted` }, {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (e) {
		console.error(e);
		return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
	}
}