import type { Post } from "@/types/posts/Posts";
import type { User } from "@/types/User/User";

const createNewPost = (user: User, postText: string, imageURL: string ) => {
    const post: Post = {
        userId: user?.id || 0,
        name: user?.name || "Name",
        username: user?.username || "username",
        id: 0,
        retweet: false,
        extraComment: "",
        title: "",
        body: postText,
        imageURL,
        likes: {
            amount: 0,
            active: false,
        },
        comments: [],
        retweets: {
            amount: 0,
            active: false,
        }
    };

    return post
}

export default createNewPost;