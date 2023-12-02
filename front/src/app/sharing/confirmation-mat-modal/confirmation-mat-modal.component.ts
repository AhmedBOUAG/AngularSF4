import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { IButton } from '../../models/interfaces/IButton';

@Component({
  selector: 'app-confirmation-mat-modal',
  templateUrl: './confirmation-mat-modal.component.html',
  styleUrls: ['./confirmation-mat-modal.component.css']
})
export class ConfirmationMatModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationMatModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      message: string, button: IButton
    }
  ) {

    console.log(data)
  }

  ngOnInit(): void {
  }
  confirmAction() {
    this.dialogRef.close('confirmed');
  }
}
