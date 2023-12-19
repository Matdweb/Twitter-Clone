export type Post = {
    userId?: number,
    name: string,
    username: string,
    id: number,
    retweet: boolean,
    extraComment?: string,
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