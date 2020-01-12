import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-login-modal',
  templateUrl: './modal.component.html'
})
export class FileNameDialogComponent implements OnInit {
  fromPage: any;
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
