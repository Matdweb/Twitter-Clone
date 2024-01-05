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
      userIds: string[],
      amount: number,
    },
    comments: comment[],
    retweets: {
      amount: number,
      active: boolean
    }
  }