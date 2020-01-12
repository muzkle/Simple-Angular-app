import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FileNameDialogComponent } from './modal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgbModule,
    LoginRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule
  ],
  declarations: [LoginComponent, FileNameDialogComponent],
  entryComponents: [FileNameDialogComponent]
})
export class LoginModule {}
