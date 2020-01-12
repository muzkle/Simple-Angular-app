import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { UsersService } from './users.service';
import { DeleteUserDialogComponent } from './modal-delete.module';
import { ExportService } from './export.service';
import { EditUserDialogComponent } from './modal-edit.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoading = false;
  data: any[] = [];

  displayedColumns: string[] = ['id', 'name', 'email', 'gender', 'actions'];
  dataSource: any = [];

  constructor(
    private usersService: UsersService,
    private dialog: MatDialog,
    private exportService: ExportService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.refresh();
  }

  refresh() {
    this.usersService
      .getUsers({ category: 'dev' })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((res: any) => {
        this.dataSource = res;
      });
  }

  editUser(user: any, index: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: {
        content: user
      }
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res.method) {
        this.refresh();
        this.toast.success(`O usuário ${res.data.user[0].name} foi atualizado com sucesso.`, 'Sucesso!');
      } else if (res.error) {
        this.toast.error(res.error, 'Oops!');
      }
    });
  }

  deleteUser(user: any, index: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      data: {
        content: user
      }
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res.method) {
        this.dataSource.splice(index, 1);
        this.dataSource = [...this.dataSource];
        this.toast.success(`O usuário ${user.name} foi removido com sucesso.`, 'Sucesso!');
      } else if (res.error) {
        this.toast.error(res.error, 'Oops!');
      }
    });
  }

  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.dataSource, 'sample');
    this.toast.success('Seu excel estará pronto em alguns instantes.', 'Exportando!');
  }
}
