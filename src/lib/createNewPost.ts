import type { Post } from "@/types/posts/Posts";
import type { User } from "@/types/User/User";

const createNewPost = (user: User, postText: string, imageURL: string ) => {
    const post: Post = {
        userId: user?._id || '',
        name: user?.name || "Name",
        username: user?.username || "username",
        id: 0,
        retweet: false,
        extraComment: "",
        title: "",
        body: postText,
        imageURL,
        likes: {
            userIds: [],
            amount: 0,
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