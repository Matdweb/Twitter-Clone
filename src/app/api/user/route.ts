import findUserByEmail from "@/lib/mongoDB/findUserByEmail";

export async function POST(request: Request) {
    const { email } = await request.json();

    const user = await findUserByEmail(email);

    if (user) {
        return Response.json({ status: 201, statusText: 'successfull', user });
    } else {
        return Response.json({ status: 400, statusText: 'Something went wrong :(', user: null });
    }
}