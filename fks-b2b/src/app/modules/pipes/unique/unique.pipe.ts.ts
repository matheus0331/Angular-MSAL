import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'unique',
  pure: false,
})
export class UniquePipe implements PipeTransform {
  transform<T>(values: T[], key: string): T[] {
    if (values !== undefined && values !== null) {
      const unique = values.filter(
        (value: T, index) =>
          values.findIndex((item: T) => item[key] === value[key]) === index
      );
      return unique;
    }
    return values;
  }
}
