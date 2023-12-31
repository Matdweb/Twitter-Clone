import { connectMongoDB } from "@/lib/mongoDB/mongodb";
import User from "@/models/user";

export async function POST(request: Request) {
    const {
        username,
        name,
        email,
        country,
        bio,
        web_page,
        profileImage
    } = await request.json();

    try {
        await connectMongoDB();
        const user = await User.findOneAndUpdate(
            { email: email },
            { $set: { username, name, country, bio, web_page, profileImage } },
            { new: true, runValidators: true }
        );

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