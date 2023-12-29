import { comment } from "./comments/comment"

export type Post = {
    userId: string,
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
    comments: comment[],
    retweets: {
      amount: number,
      active: boolean
    }
  }