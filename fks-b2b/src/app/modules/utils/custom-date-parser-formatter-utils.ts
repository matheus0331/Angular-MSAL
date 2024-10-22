import {Injectable} from '@angular/core';
import {NgbDate, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly FORMAT_DELIMITER = '/';
  readonly PARSE_DELIMITER = '-';

  parse(value: string): NgbDate | null {
    if (value) {
      const date = value.split(this.PARSE_DELIMITER);
      return new NgbDate(
        parseInt(date[0], 10),
        parseInt(date[1], 10),
        parseInt(date[2], 10)
      );
    }

    return null;
  }

  format(date: any | null): string {
    return date
      ? date.day +
      this.FORMAT_DELIMITER +
      date.month +
      this.FORMAT_DELIMITER +
      date.year
      : '';
  }
}
