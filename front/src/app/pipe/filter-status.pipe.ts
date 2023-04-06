import { Pipe, PipeTransform } from '@angular/core';
import { CommonUtils } from '../Utils/CommonUtils';

@Pipe({
  name: 'filterStatus'
})
export class FilterStatusPipe implements PipeTransform {

  transform(status: string): string {
    if (!status || '' === status.trim()) {
      return status;
    }

    const recipeStatusValues = Object.values(CommonUtils.recipeStatus);
    if (!recipeStatusValues.includes(status)) {
      return status;
    }
    const InvertStatus = CommonUtils.invertObject(CommonUtils.recipeStatus);

    return InvertStatus[status];
  }

}
