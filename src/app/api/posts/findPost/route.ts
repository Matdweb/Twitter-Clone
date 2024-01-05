import { connectMongoDB } from "@/lib/mongoDB/mongodb";
import User from "@/models/user";
import { User as UserType } from "@/types/User/User";

export async function POST(request: Request) {
    const { userId, postId } = await request.json();

    try {
        await connectMongoDB();
        const user: UserType = await User.findOne(
            {
                _id: userId,
                posts: { $elemMatch: { id: postId } }
            },
        );

        if (user) {
            return Response.json({ status: 201, statusText: 'User updated successfully', post: user.posts.find((post) => post.id == postId) });
        } else {
            return Response.json({ status: 400, statusText: 'There was an error updating the post :(', post: null });
        }

    } catch (e) {
        console.log(e);
        return Response.json({ status: 500, statusText: 'Internal Server Error', post: null });
    }
}