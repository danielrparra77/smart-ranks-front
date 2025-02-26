import { MatDialogRef } from '@angular/material/dialog';

export abstract class IDialog {

  constructor(protected readonly dialogRef: MatDialogRef<any>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}