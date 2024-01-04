import { connectMongoDB } from "@/lib/mongoDB/mongodb";
import User from "@/models/user";
import type { Post } from "@/types/posts/Posts";

export async function POST(request: Request) {
    const {
        userId, post
    }: {
        userId: string,
        post: { id: number, userId: string }
    } = await request.json();

    try {
        await connectMongoDB();
        const user = await User.findOne({ _id: post.userId });

        if (!user) {
            return Response.json({ status: 400, statusText: 'There was an error finding the user :(', likedPost: null });
        }

        const postToUpdate: Post = user.posts.find((userPost: Post) => userPost.id === post.id);

        if (!postToUpdate) {
            return Response.json({ status: 400, statusText: 'There was an error finding the post :(', likedPost: null });
        }

        const activeUserLike: boolean = postToUpdate.likes.userIds.includes(userId) //userId of the one that likes the post not the owner

        if (activeUserLike) {
            postToUpdate.likes.userIds = postToUpdate.likes.userIds.filter((user_id: string) => {
                if (user_id !== userId) {
                    return user_id;
                }
            })
            postToUpdate.likes.amount -= 1;
        } else {
            postToUpdate.likes.userIds.push(userId);
            postToUpdate.likes.amount += 1;
        }

        await user.save();

        if (postToUpdate) {
            return Response.json({ status: 201, statusText: 'User updated successfully', likedPost: postToUpdate });
        }

    } catch (e) {
        console.log(e);
        return Response.json({ status: 500, statusText: 'Internal Server Error', likedPost: null });
    }
}