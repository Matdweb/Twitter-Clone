import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import findUserByEmail from "@/lib/findUserByEmail";

export async function POST(request: Request) {
    const {
        name,
        email,
        password
    } = await request.json();

    console.log(name, email, password);

    if (await findUserByEmail(email)) {
        return Response.json({ status: 400, statusText: 'There is already a User' });
    }

    await connectMongoDB();
    await User.create({ name, email, password });

    return Response.json({ status: 201, statusText: 'User creation successfull' });
}