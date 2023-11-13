import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DefaultResponseType} from "../../../types/default-response.type";
import {environment} from "../../../environments/environment";
import {MoreArticleType} from "../../../types/more-article.type";
import {ActionsForCommentType} from "../../../types/actions-for-comment.type";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {
  }

  getComments(params: { offset: number, article: string }): Observable<MoreArticleType> {
    return this.http.get<MoreArticleType>(environment.api + 'comments', {
      params: params
    });
  }

  addComment(text: string, article: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'comments', {
      text, article
    });
  }

  applyAction(id: string, action: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'comments/' + id + '/apply-action', {
      action: action
    });
  }

  getActionsForComment(id: string): Observable<ActionsForCommentType[]> {
    return this.http.get<ActionsForCommentType[]>(environment.api + 'comments/' + id + '/actions');
  }

  getActionsOfCommentsForActualArticle(id: string): Observable<ActionsForCommentType[]> {
    return this.http.get<ActionsForCommentType[]>(environment.api + 'comments/article-comment-actions?articleId=' + id);

  }

}
