import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageHandlerService {
  message = {};

  constructor() { }

  display(mess: string, error = false): any {
    if (error) {
      this.message = {
        'iconOperation': 'fa-exclamation-triangle',
        'typeOperation': 'alert-warning',
        'messageOperation': mess
      }
    }
    if (mess === 'DELETE') {
      this.message = {
        'iconOperation': 'fa-trash-alt',
        'typeOperation': 'alert-danger',
        'messageOperation': 'La recette a été supprimée de manière définitive.'
      }
    }
    if (mess === 'MODIF') {
      this.message = {
        'iconOperation': 'fa-check-circle',
        'typeOperation': 'alert-success',
        'messageOperation': 'Les modifications ont été apportées avec succès'
      }
    }
    if (mess === 'CREATE') {
      this.message = {
        'iconOperation': 'fa-check-circle',
        'typeOperation': 'alert-success',
        'messageOperation': 'La recette a été créée avec succès'
      }
    }

    return this.message;
  }
}
