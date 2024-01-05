import { User } from "@/types/User/User";

const requestUserProfileImage = async (userId: string) => {
    if (userId.length > 4) {
        try {
            const response = await fetch('/api/user/findById', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId })
            });

            const { user }: { user: User } = await response.json();
            if (user) {
                return user.profileImage;
            }
        } catch (e) {
            console.log(e);
        }
    }
    return {
        url: "",
        thumbnailUrl: ""
    }
}

export default requestUserProfileImage;