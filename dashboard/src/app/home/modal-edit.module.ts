import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

import { UsersService } from './users.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit-template.component.html'
})
export class EditUserDialogComponent implements OnInit {
  fromPage: any;
  userForm!: FormGroup;

  genders: any[] = [
    { value: 'masculino', viewValue: 'Masculino' },
    { value: 'feminino', viewValue: 'Feminino' },
    { value: 'outro', viewValue: 'Outro' }
  ];

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.fromPage = data;
    this.createForm();
  }

  ngOnInit() {
    this.userForm.patchValue({ name: this.fromPage.content.name, gender: this.fromPage.content.gender.toLowerCase() });
  }

  update() {
    this.usersService.editUser({ ...this.userForm.value, id: this.fromPage.content.id }).subscribe((res: any) => {
      if (!res.error) {
        this.dialogRef.close({ event: 'close', method: 'update', data: res });
      }
    });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close' });
  }

  private createForm() {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }
}
