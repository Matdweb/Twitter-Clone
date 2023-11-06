import findUserByEmail from "@/lib/findUserByEmail";

export async function POST(request: Request) {
    const {
        email,
        password
    } = await request.json();

    const user = await findUserByEmail(email);
    
    if (user) {
        if (user.password === password) {
            return Response.json({status: 201, statusText: 'Authenticated User'});
        } else {
            return Response.json({status: 400, statusText: 'Wrong password'})
        }
    } else {
        return Response.json({ status: 400, statusText: 'User doesnt exists' });
    }

}