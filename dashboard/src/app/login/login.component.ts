import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { environment } from '@env/environment';
import { Logger, I18nService, AuthenticationService, untilDestroyed } from '@app/core';
import { FileNameDialogComponent } from './modal';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  version: string | null = environment.version;
  error: string | undefined;
  loginForm!: FormGroup;
  isLoading = false;
  wrongPass: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog
  ) {
    this.createForm();
  }

  ngOnInit() {}

  ngOnDestroy() {}

  login() {
    this.isLoading = true;
    const login$ = this.authenticationService.login(this.loginForm.value);
    login$
      .pipe(
        finalize(() => {
          this.loginForm.markAsPristine();
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(
        credentials => {
          if (credentials.error) {
            this.openDialog(credentials);
          } else {
            log.debug(`${credentials.email} successfully logged in`);
            this.router.navigate([this.route.snapshot.queryParams.redirect || '/'], { replaceUrl: true });
          }
        },
        error => {
          log.debug(`Login error: ${error}`);
          this.error = error;
        }
      );
  }

  openDialog(status: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(FileNameDialogComponent, {
      data: {
        content: status
      }
    });
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: true
    });
  }
}
