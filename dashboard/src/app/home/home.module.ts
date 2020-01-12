import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DeleteUserDialogComponent } from './modal-delete.module';
import { EditUserDialogComponent } from './modal-edit.module';
import { CamelCasePipe } from './camelcase.pipe';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule
  ],
  exports: [CamelCasePipe],
  declarations: [HomeComponent, DeleteUserDialogComponent, EditUserDialogComponent, CamelCasePipe],
  entryComponents: [DeleteUserDialogComponent, EditUserDialogComponent]
})
export class HomeModule {}
