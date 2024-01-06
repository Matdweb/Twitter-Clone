import User from "@/models/user";
import { connectMongoDB } from "@/lib/mongoDB/mongodb";

export async function POST(request: Request) {
    const { userId } = await request.json();

    try {
        await connectMongoDB();
        const user = await User.findOne({ _id: userId });

        if (user) {
            return Response.json({ status: 201, statusText: 'successfull', user });
        } else {
            return Response.json({ status: 400, statusText: 'Something went wrong :(', user: null });
        }

    } catch (e) {
        console.log(e);
        return Response.json({ status: 500, statusText: 'Internal server error', user: null });
    }
}