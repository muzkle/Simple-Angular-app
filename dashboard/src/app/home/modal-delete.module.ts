import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UsersService } from './users.service';

@Component({
  template: `
    <h4>Remover usuário</h4>
    <mat-dialog-content class="text-center">
      Deseja mesmo remover o usuário:<br />
      <b>{{ fromPage?.content?.name }}</b>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-flat-button class="custom-modal btn-success" (click)="confirmDialog()">Sim</button>
      <button mat-button mat-flat-button class="custom-modal btn-danger" (click)="closeDialog()">Cancelar</button>
    </mat-dialog-actions>
  `
})
export class DeleteUserDialogComponent implements OnInit {
  fromPage: any;
  fromDialog: string;

  constructor(
    public dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    private usersService: UsersService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.fromPage = data;
  }

  ngOnInit() {}

  confirmDialog() {
    this.usersService.deleteUser(this.fromPage.content.id).subscribe((res: any) => {
      if (!res.error) {
        this.dialogRef.close({ event: 'close', method: 'delete', data: this.fromPage });
      }
    });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close' });
  }
}
