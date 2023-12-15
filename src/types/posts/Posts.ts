export type Post = {
    userId?: number,
    id: number,
    retweet: boolean,
    title: string,
    body: string,
    imageURL?: string,
    likes: {
      amount: number,
      active: boolean
    },
    comments: [],
    retweets: {
      amount: number,
      active: boolean
    }
  }