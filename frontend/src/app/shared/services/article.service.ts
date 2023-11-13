import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {ArticleType} from "../../../types/article.type";
import {environment} from "../../../environments/environment";
import {ActiveParamsType} from "../../../types/active-params.type";
import {ArticlesAllType} from "../../../types/articlesAll.type";
import {ActualArticleType} from "../../../types/actual-article.type";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient,
              private router: Router) { }

  getPopularArticles(): Observable<ArticleType[]>{
    return this.http.get<ArticleType[]>(environment.api + 'articles/top');
  }
  getAllArticles(activeParams: ActiveParamsType): Observable<ArticlesAllType>{
    return this.http.get<ArticlesAllType>(environment.api + 'articles',{
      params: activeParams
    });
  }
  getActualArticle(actualArticleUrl: string): Observable<ActualArticleType>{
    return this.http.get<ActualArticleType>(environment.api + 'articles/' + actualArticleUrl);
  }

  getRelatedArticles(actualArticleUrl: string): Observable<ArticleType[]>{
    return this.http.get<ArticleType[]>(environment.api + 'articles/related/' + actualArticleUrl);
  }



}
