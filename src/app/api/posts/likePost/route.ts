import { connectMongoDB } from "@/lib/mongoDB/mongodb";
import User from "@/models/user";
import type { Post } from "@/types/posts/Posts";

export async function POST(request: Request) {
    const { userId, postId } = await request.json();

    try {
        await connectMongoDB();
        const user = await User.findOne({ _id: userId });

        if (!user) {
            return Response.json({ status: 400, statusText: 'There was an error finding the user :(', post: null });
        }

        const postToUpdate = user.posts.find((post: { id: string, likes: string[] }) => post.id === postId);

        if (!postToUpdate) {
            return Response.json({ status: 400, statusText: 'There was an error finding the post :(', post: null });
        }

        const activeUserLike: boolean = postToUpdate.likes.includes(userId)

        if (activeUserLike) {
            postToUpdate.likes = postToUpdate.likes.filter((user: string) => {
                if (user !== userId) {
                    return user;
                }
            })
        } else {
            postToUpdate.likes.push(userId);
        }

        await user.save();

        if (postToUpdate) {
            return Response.json({ status: 201, statusText: 'User updated successfully', post: postToUpdate, likes: postToUpdate.likes.length, active: !activeUserLike });
        }

    } catch (e) {
        console.log(e);
        return Response.json({ status: 500, statusText: 'Internal Server Error', post: null });
    }
}