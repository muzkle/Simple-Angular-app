import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  template: `
    <mat-dialog-content>
      {{ this.fromPage.content.message }}
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button color="primary" class="custom-modal" (click)="closeDialog()">OK</button>
    </mat-dialog-actions>
  `
})
export class FileNameDialogComponent implements OnInit {
  fromPage: string;
  fromDialog: string;

  constructor(
    public dialogRef: MatDialogRef<FileNameDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.fromPage = data;
  }

  ngOnInit() {}

  closeDialog() {
    this.dialogRef.close({ event: 'close' });
  }
}
