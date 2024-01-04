import { connectMongoDB } from "@/lib/mongoDB/mongodb";
import User from "@/models/user";
import type { Post } from "@/types/posts/Posts";

export async function POST(request: Request) {
    const {
        email,
        post
    }: { email: string, post: Post } = await request.json();

    try {
        await connectMongoDB();

        if (post.retweet) {
            //if the post belongs to a user it finds the original post and updates the retweets amount
            const user = await User.findOne({ _id: post.userId });

            user.posts = user.posts.map(({ id, retweets, ...rest }: Post) => {
                if (id === post.id) {
                    return {
                        id,
                        retweets: {
                            amount: post.retweets.amount,
                            active: false
                        },
                        ...rest
                    }
                } else {
                    return { id, retweets, ...rest }
                }
            })

            await user.save();
        }

        const user = await User.findOne({ email });
        const lastPostId: number = user && user.posts.length > 0 && user.posts[0].id || 100;
        post.id = lastPostId + 1;
        post.userId = user._id;

        user.posts = [post, ...user.posts];

        await user.save();

        if (user) {
            return Response.json({ status: 201, statusText: 'Post added successfully', retweetedPost: post });
        } else {
            return Response.json({ status: 400, statusText: 'There was an error adding the post :(', retweetedPost: null });
        }

    } catch (e) {
        console.log(e);
        return Response.json({ status: 500, statusText: 'Internal Server Error', retweetedPost: null });
    }
}