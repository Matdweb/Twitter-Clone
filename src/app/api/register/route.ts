import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import findUserByEmail from "@/lib/findUserByEmail";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    const {
        name,
        email,
        password
    } = await request.json();

    const hashedPassword = await bcrypt.hash(password,10);

    console.log(name, email, hashedPassword);

    if (await findUserByEmail(email)) {
        return Response.json({ status: 400, statusText: 'There is already a User' });
    }

    await connectMongoDB();
    await User.create({ name, email, password: hashedPassword, posts: [] });

    return Response.json({ status: 201, statusText: 'User creation successfull' });
}