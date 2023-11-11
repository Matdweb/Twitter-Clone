import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import findUserByEmail from "@/lib/findUserByEmail";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    const {
        username,
        name,
        email,
        password
    } = await request.json();

    const hashedPassword = await bcrypt.hash(password,10);

    if (await findUserByEmail(email)) {
        return Response.json({ status: 400, statusText: 'The user already exists' });
    }

    await connectMongoDB();
    await User.create({ username, name, email, password: hashedPassword, posts: [] });

    return Response.json({ status: 201, statusText: 'User creation successfull' });
}