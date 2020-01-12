import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'camelCase' })
export class CamelCasePipe implements PipeTransform {
  transform(value: any): any {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
