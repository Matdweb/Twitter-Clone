export type User = {
    name: string,
    email: string,
    username: string,
    id: number,
    country: string,
    profileImage: {
        url: string,
        thumbnailUrl: string
    }
    bio: string,
    web_page: {
        name: string,
        url: string
    },
    followers: [],
    following: [],
    posts: []
} | null;