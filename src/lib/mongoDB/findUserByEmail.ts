import { connectMongoDB } from "@/lib/mongoDB/mongodb";
import User from "@/models/user";

const findUserByEmail = async (email: string) => {
    try {
        await connectMongoDB();
        const user = await User.findOne({ email });
        return user;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export default findUserByEmail