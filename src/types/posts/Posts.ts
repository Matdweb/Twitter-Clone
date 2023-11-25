export type Post = {
    userId?: number,
    id: number,
    title: string,
    body: string,
    imageURL?: string,
    likes: number,
    comments: [],
    retweets: number
  }