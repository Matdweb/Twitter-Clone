import { User } from "@/types/User/User";

const findUserById = async (userId: string) => {
    try {
        const response = await fetch('/api/user/findById', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId })
        });

        const { status, user }: { status: number, user: User } = await response.json();
        if (status === 201) return user;
    } catch (e) {
        console.log(e);
    }
    return null;
}

export default findUserById