import { connectMongoDB } from "@/lib/mongoDB/mongodb";
import User from "@/models/user";
import type { Post } from "@/types/posts/Posts";

export async function POST(request: Request) {
    const { userId, postId, comment } = await request.json();

    try {
        await connectMongoDB();
        const user = await User.findOne({ _id: userId });

        if (!user) {
            return Response.json({ status: 400, statusText: 'There was an error finding the user :(' });
        }

        const postToUpdate: Post = user?.posts.find((post: Post) => post.id === postId);

        if (!postToUpdate) {
            return Response.json({ status: 400, statusText: 'There was an error finding the post :(' });
        }

        const newComment = {
            ...comment,
            id: postToUpdate.comments.length > 0 ? postToUpdate.comments[postToUpdate.comments.length - 1].id + 1 : 0,
        };

        postToUpdate.comments.push(newComment);

        await user.save();

        if (postToUpdate) {
            return Response.json({ status: 201, statusText: 'User updated successfully', post: postToUpdate });
        }

        if (user) {
            return Response.json({ status: 201, statusText: 'User updated successfully' });
        } else {
            return Response.json({ status: 400, statusText: 'There was an error updating the user :(' });
        }

    } catch (e) {
        console.log(e);
        return Response.json({ status: 500, statusText: 'Internal Server Error' });
    }
}