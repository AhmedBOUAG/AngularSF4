import { Injectable } from '@angular/core';
import { IToast } from '../models/interfaces/IToast';
import { CommonUtils } from '../Utils/CommonUtils';

@Injectable({
  providedIn: 'root'
})
export class MessageHandlerService {
  message: IToast;

  constructor() { }

  display(mess: string, message: string = '', error = false): any {
    if (error) {
      this.message = {
        severity: 'warn',
        summary: 'Important',
        detail: mess
      }
    }
    if (mess === CommonUtils.DELETE) {
      this.message = {
        severity: 'error',
        summary: 'Alerte',
        detail: CommonUtils.messageToast.recipeDeleted
      }
    }
    if (mess === CommonUtils.MODIF) {
      this.message = {
        severity: 'info',
        summary: 'Info',
        detail: CommonUtils.messageToast.recipeUpdated
      }
    }
    if (mess === CommonUtils.CREATE) {
      this.message = {
        severity: 'success',
        summary: 'Succès',
        detail: message
      }
    }

    return this.message;
  }
}
