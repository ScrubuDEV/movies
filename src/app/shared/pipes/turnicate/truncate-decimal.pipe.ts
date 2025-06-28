import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateDecimal',
})
export class TruncateDecimalPipe implements PipeTransform {
  transform(value: number | undefined, digits: number = 1): string {
    if (value === undefined || value === null) return 'N/A';

    const factor = Math.pow(10, digits);
    const truncated = Math.floor(value * factor) / factor;

    return truncated.toString();
  }
}
