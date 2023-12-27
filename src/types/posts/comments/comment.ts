export type comment = {
    id: number,
    body: string,
    username: string,
    profileImage?: {
        url: string,
        thumbnailUrl: string,
    }
}