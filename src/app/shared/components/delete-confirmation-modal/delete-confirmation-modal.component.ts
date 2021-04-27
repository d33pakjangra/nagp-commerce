import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteConfirmation } from 'src/app/core/models/delete-confirmation';

@Component({
  selector: 'app-delete-confirmation-modal',
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrls: ['./delete-confirmation-modal.component.scss'],
})
export class DeleteConfirmationModalComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DeleteConfirmationModalComponent>, @Inject(MAT_DIALOG_DATA) public data: DeleteConfirmation) {}

  ngOnInit(): void {}

  yesClick() {
    this.dialogRef.close(true);
  }

  noClick() {
    this.dialogRef.close(false);
  }
}
