import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'articleDescription'
})
export class ArticleDescriptionPipe implements PipeTransform {

  transform(value: string): string {
    return value.length <= 150 ? value : `${value.slice(0, 150)}...`;
  }

}
