export type Post = {
    userId?: number,
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