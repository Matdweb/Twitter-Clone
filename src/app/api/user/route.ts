import findUserByEmail from "@/lib/mongoDB/findUserByEmail";

export async function POST(request: Request) {
    const { email } = await request.json();

    const user = await findUserByEmail(email);

    if (user) {
        user.posts = user.posts.map((post: { likes: string[] }) => {
            const likesAmount = post.likes.length;
            if (post.likes.includes(user._id)) {
                return {
                    ...post,
                    likes: {
                        amount: likesAmount,
                        active: true
                    }
                }
            } else {
                return {
                    ...post,
                    likes: {
                        amount: likesAmount,
                        active: false
                    }
                }
            }
        })

        return Response.json({ status: 201, statusText: 'successfull', user });
    } else {
        return Response.json({ status: 400, statusText: 'Something went wrong :(', user: null });
    }
}