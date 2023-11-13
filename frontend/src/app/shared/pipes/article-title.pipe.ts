import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'articleTitle'
})
export class ArticleTitlePipe implements PipeTransform {

  transform(value: string): string {
    return value.length <= 55 ? value : `${value.slice(0, 55)}...`;
  }

}
