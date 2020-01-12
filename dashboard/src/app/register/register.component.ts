import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { environment } from '@env/environment';
import { Logger, I18nService, AuthenticationService, untilDestroyed } from '@app/core';
import { FileNameDialogComponent } from './modal';

const log = new Logger('register');

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  version: string | null = environment.version;
  error: string | undefined;
  registerForm!: FormGroup;
  isLoading = false;
  wrongPass: boolean = false;

  patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }

  genders: any[] = [
    { value: 'masculino', viewValue: 'Masculino' },
    { value: 'feminino', viewValue: 'Feminino' },
    { value: 'outro', viewValue: 'Outro' }
  ];

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

  register() {
    this.isLoading = true;
    const register$ = this.authenticationService.register(this.registerForm.value);
    register$
      .pipe(
        finalize(() => {
          this.registerForm.markAsPristine();
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(
        credentials => {
          if (credentials.error) {
            this.openDialog(credentials);
          } else {
            log.debug(`${credentials.email} successfully registered in`);
            log.debug(`${credentials.email} successfully logged in`);
            this.router.navigate([this.route.snapshot.queryParams.redirect || '/'], { replaceUrl: true });
          }
        },
        error => {
          log.debug(`Register error: ${error}`);
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
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        null,
        Validators.compose([
          // 1. Password Field is Required
          Validators.required,
          // 2. check whether the entered password has a number
          this.patternValidator(/\d/, { hasNumber: true }),
          // 3. check whether the entered password has upper case letter
          this.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          // 4. check whether the entered password has a lower-case letter
          this.patternValidator(/[a-z]/, { hasSmallCase: true }),
          // 6. Has a minimum length of 8 characters
          Validators.minLength(10),
          Validators.maxLength(20)
        ])
      ],
      gender: ['', Validators.required]
    });
  }
}
