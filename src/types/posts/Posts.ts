export type Post = {
    userId?: number,
    name: string,
    username: string,
    id: number,
    title: string,
    body: string,
    imageURL?: string,
    likes: {
      amount: number,
      active: boolean
    },
    comments: [],
    retweets: number
  }