import type { Post } from "@/types/posts/Posts";
import type { PiscumImage } from "@/types/posts/images/images";

export async function POST(request: Request) {
    const { lastPostId } = await request.json() || 0;
    const batchSize = 12;
    const postsLength = 100;
    const endPost = Math.min(lastPostId + batchSize, postsLength);

    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=${lastPostId}&_end=${endPost}`);
    const posts = await response.json();

    const imageURLs = await requestImages(batchSize);

    return Response.json({
        posts: posts.map((post: Post, i: number) => {
            return {
                ...post,
                name: "Name",
                username: "username",
                likes: {
                    amount: Math.floor(Math.random() * 201),
                    active: false
                },
                comments: [],
                retweets: Math.floor(Math.random() * 201),
                imageURL: imageURLs[i]
            }
        })
    });
}

const requestImages = async (batchSize: number) => {
    const randomPage = Math.floor(Math.random() * 80) + 1;
    try {
        const response = await fetch(`https://picsum.photos/v2/list?page=${randomPage}&limit=${batchSize}`);
        const imageURLs = await response.json();

        return imageURLs.map((image: PiscumImage) => {
            return image.download_url;
        })
    } catch (e) {
        console.log(e);
        return [];
    }
}