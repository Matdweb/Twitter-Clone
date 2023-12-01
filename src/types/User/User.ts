export type User = {
    name: string,
    email: string,
    username: string,
    id: number,
    country: string,
    profileImage: {
        url: string
    }
    bio: string,
    followers: [],
    following: [],
    posts: []
} | null;