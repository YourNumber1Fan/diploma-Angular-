import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArticleCardComponent} from './componens/article-card/article-card.component';
import {RouterModule} from "@angular/router";
import { LoaderComponent } from './componens/loader/loader.component';
import { ArticleTitlePipe } from './pipes/article-title.pipe';
import { ArticleDescriptionPipe } from './pipes/article-description.pipe';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { CommentCardComponent } from './componens/comment-card/comment-card.component';


@NgModule({
  declarations: [
    ArticleCardComponent,
    LoaderComponent,
    ArticleTitlePipe,
    ArticleDescriptionPipe,
    CommentCardComponent,
  ],
  exports: [
    ArticleCardComponent,
    ArticleTitlePipe,
    ArticleDescriptionPipe,
    CommentCardComponent,

  ],
  imports: [
    RouterModule,
    MatProgressSpinnerModule,
    CommonModule
  ]
})
export class SharedModule {
}
