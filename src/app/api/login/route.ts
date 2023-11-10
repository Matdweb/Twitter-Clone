import findUserByEmail from "@/lib/findUserByEmail";
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
    const {
        email,
        password
    } = await request.json();

    const user = await findUserByEmail(email);

    if (user) {
        try {
            if (await bcrypt.compare(password, user.password)) {
                return Response.json({ status: 201, statusText: 'Authenticated User', email: true, password: true });
            } else {
                return Response.json({ status: 400, statusText: 'Wrong password', email: true, password: false })
            }
        } catch (e) {
            console.log(e);
            return Response.json({ status: 400, statusText: 'Something went wrong ... Just try again!' })
        }
    } else {
        return Response.json({ status: 400, statusText: 'User doesnt exists', email: false, password: true });
    }
}