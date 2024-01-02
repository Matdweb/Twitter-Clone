import { connectMongoDB } from "@/lib/mongoDB/mongodb";
import User from "@/models/user";

export async function POST(request: Request) {
    const {
        email,
        post
    } = await request.json();

    try {
        await connectMongoDB();

        post.likes = [];

        const user = await User.findOneAndUpdate(
            { email: email },
            {
                $push: {
                    posts: {
                        $each: [post],
                        $position: 0
                    }
                },
            },
            { new: true, runValidators: true }
        );

        if (user) {
            return Response.json({ status: 201, statusText: 'Post added successfully' });
        } else {
            return Response.json({ status: 400, statusText: 'There was an error adding the post :(' });
        }

    } catch (e) {
        console.log(e);
        return Response.json({ status: 500, statusText: 'Internal Server Error' });
    }
}