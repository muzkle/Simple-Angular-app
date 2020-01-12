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
import { MatSelectModule } from '@angular/material/select';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { FileNameDialogComponent } from './modal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgbModule,
    RegisterRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule
  ],
  declarations: [RegisterComponent, FileNameDialogComponent],
  entryComponents: [FileNameDialogComponent]
})
export class RegisterModule {}
