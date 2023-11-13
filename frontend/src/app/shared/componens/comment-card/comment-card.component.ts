import {Component, Input, OnInit} from '@angular/core';
import {CommentsType} from "../../../../types/comments.type";
import {ActionType} from "../../../../types/action.type";
import {CommentService} from "../../services/comment.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {
  @Input() comment: CommentsType;
  like: boolean = false;
  dislike: boolean = false;
  actionBefore: string = '';
  actionLike: ActionType = ActionType.like;
  actionDislike: ActionType = ActionType.dislike;
  actionViolate: ActionType = ActionType.violate;

  constructor(private commentService: CommentService,
              private _snackBar: MatSnackBar) {
    this.comment = {
      id:'',
      text: '',
      date: '',
      likesCount: 0,
      dislikesCount: 0,
      user: {
        id: '',
        name: ''
      },
      // isAction?: '',
    }
  }

  ngOnInit(): void {
    this.commentService.getActionsForComment(this.comment.id)
      .subscribe(data => {
        if (data && data.length > 0) {
          this.actionBefore = data[0].action;
          if (data[0].action === this.actionLike) {
            this.like = true;
            this.dislike = false;
          } else if (data[0].action === this.actionDislike) {
            this.like = false;
            this.dislike = true;
          }
        }
      })
  }

  applyActionLike(id: string) {
    this.commentService.applyAction(id, this.actionLike)
      .subscribe({
        next: (data: DefaultResponseType) => {
          if (data && !data.error) {
            this.like = !this.like;
            this.dislike = false;
            if (this.actionBefore === '') {
              this.actionBefore = this.actionLike;
              this.comment.likesCount++;
              this._snackBar.open('Ваш голос учтен');
              return;
            }
            if (this.actionBefore === this.actionDislike) {
              this.actionBefore = this.actionLike;
              this.comment.likesCount++;
              this.comment.dislikesCount--;
              this._snackBar.open('Ваш голос учтен');
              return;
            }
            if (this.actionBefore === this.actionLike) {
              this.actionBefore = '';
              this.comment.likesCount--;
              this._snackBar.open('Ваш голос учтен');
              return;
            }
          }
        },
        error: (errorResponse: HttpErrorResponse) => {
          if (errorResponse.error && errorResponse.error.message) {
            console.log(errorResponse.error.message);
            this._snackBar.open('Для добавления лайка нужно авторизоваться');
          } else {
            this._snackBar.open('Ошибка добавления лайка')
          }
        }
      })
  }

  applyActionDislike(id: string) {
    this.commentService.applyAction(id, this.actionDislike)
      .subscribe({
        next: (data: DefaultResponseType) => {
          if (data && !data.error) {
            this.dislike = !this.dislike;
            this.like = false;
            if (this.actionBefore === '') {
              this.actionBefore = this.actionDislike;
              this.comment.dislikesCount++;
              this._snackBar.open('Ваш голос учтен');
              return;
            }
            if (this.actionBefore === this.actionDislike) {
              this.actionBefore = '';
              this.comment.dislikesCount--;
              this._snackBar.open('Ваш голос учтен');
              return;
            }
            if (this.actionBefore === this.actionLike) {
              this.actionBefore = this.actionDislike;
              this.comment.likesCount--;
              this.comment.dislikesCount++;
              this._snackBar.open('Ваш голос учтен');
              return;
            }
          }
        },
        error: (errorResponse: HttpErrorResponse) => {
          if (errorResponse.error && errorResponse.error.message) {
           console.log(errorResponse.error.message);
            this._snackBar.open('Для добавления дизлайка нужно авторизоваться');
          } else {
            this._snackBar.open('Ошибка добавления дизлайка')
          }
        }
      })
  }

  applyActionViolate(id: string) {
    this.commentService.applyAction(id, this.actionViolate)
      .subscribe({
        next: (data) => {
          if (!data.error) {
            this._snackBar.open('Жалоба отправлена!');
            return;
          }
        },
        error: () => {
          this._snackBar.open('Жалоба уже отправлена!')
        }
      });
  }
}
