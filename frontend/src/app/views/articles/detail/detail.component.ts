import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {ArticleService} from "../../../shared/services/article.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActualArticleType} from "../../../../types/actual-article.type";
import {ArticleType} from "../../../../types/article.type";
import {environment} from "../../../../environments/environment";
import {CommentsType} from "../../../../types/comments.type";
import {CommentService} from "../../../shared/services/comment.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MoreArticleType} from "../../../../types/more-article.type";
import {DefaultResponseType} from "../../../../types/default-response.type";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  isLogged: boolean = false;
  actualArticle: ActualArticleType = {
    text: '',
    comments: [],
    commentsCount: 0,
    id: '',
    title: '',
    description: '',
    image: '',
    date: '',
    category: '',
    url: ''
  };
  relatedArticles: ArticleType[] = [];
  serverStaticPath = environment.serverStaticPath;
  comments: CommentsType[] = [];
  commentText: string = '';
  offset: number = 3;
  isShowMoreComments: boolean = true;
  numberOfAddedComments: number = 10;

  constructor(private authService: AuthService,
              private articleService: ArticleService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private _snackBar: MatSnackBar,
              private commentService: CommentService
              ) {
    this.isLogged = this.authService.getIsLoggedIn();
  }

  ngOnInit(): void {
    this.getActualArticle();
    this.getRelatedArticles();
  }

  getActualArticle(){
    this.activatedRoute.params.subscribe(params=>{
      this.articleService.getActualArticle(params['url'])
        .subscribe({
          next:(data:ActualArticleType)=> {
            this.actualArticle = data;
            this.comments = data.comments;
            if(data.commentsCount <= 3){
              this.isShowMoreComments = false;
            }
            // this.getCommentsForActualArticle();
            this.commentService.getActionsOfCommentsForActualArticle(this.actualArticle.id)
              .subscribe({
                next: (data) => {
                  this.comments.forEach(comment => {
                    data.forEach(action => {
                      if (comment.id === action.comment) {
                        comment.isAction = action.action;
                      }
                    })
                  })
                },
                error: (errorResponse: HttpErrorResponse) => {
                  if (errorResponse.error && errorResponse.error.message) {
                    console.log(errorResponse.error.message);
                    // this._snackBar.open(errorResponse.error.message);
                  } else {
                    this._snackBar.open('Ошибка получения реакций для комментариев')
                  }
                }
              });
            if (this.actualArticle.commentsCount < 3) {
              this.isShowMoreComments = false;
            }

          },
          error:(errorResponse: HttpErrorResponse) =>{
            if (errorResponse.error && errorResponse.error.message) {
              this._snackBar.open(errorResponse.error.message);
            } else {
              this._snackBar.open('Ошибка загрузки, попробуйте перезагрузить страницу')
            }
          }
        })
    })
  }

  getRelatedArticles(){
    this.activatedRoute.params.subscribe(params => {
      this.articleService.getRelatedArticles(params['url'])
        .subscribe({
          next: (data: ArticleType[]) => {
            this.relatedArticles = data
          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snackBar.open(errorResponse.error.message);
            } else {
              this._snackBar.open('Ошибка загрузки, попробуйте перезагрузить страницу')
            }
          }
        })
    })
  }

  showMoreComments(){
   this.commentService.getComments({
     offset: this.offset,
     article: this.actualArticle.id
   }).subscribe({
     next:(data: MoreArticleType) => {
       data.comments.forEach(comment => {
         this.comments.push(comment);
       })
       this.offset = this.offset + this.numberOfAddedComments;
       if(this.offset >= this.actualArticle.commentsCount) {
         this.isShowMoreComments = false;
       }
     },
     error: (errorResponse: HttpErrorResponse) => {
       if (errorResponse.error && errorResponse.error.message) {
         this._snackBar.open(errorResponse.error.message);
       } else {
         this._snackBar.open('Ошибка получения комментариев')
       }
     }
   })
  }

  addComment(){
    this.commentService.addComment(this.commentText, this.actualArticle.id)
      .subscribe({
        next:(data: DefaultResponseType)=>{
          if(data && !data.error){
            this._snackBar.open(data.message);
          }
          this.getActualArticle();
        },
        error:(errorResponse: HttpErrorResponse)=>{
          if (errorResponse.error && errorResponse.error.message) {
            this._snackBar.open(errorResponse.error.message);
          } else {
            this._snackBar.open('Ошибка добавления нового комментария!')
          }
        }
      })
  }

}
