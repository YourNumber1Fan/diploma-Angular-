import {CommentsType} from "./comments.type";

export type ActualArticleType = {
  text:string,
  comments: CommentsType[],
  commentsCount:number,
  id: string,
  title: string,
  description: string,
  image: string,
  date: string,
  category: string,
  url: string
}
