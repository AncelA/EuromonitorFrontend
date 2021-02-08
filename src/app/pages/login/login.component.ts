import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { first, map } from "rxjs/operators";
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessComponent } from '../snack/success/success.component';
import { FailComponent } from '../snack/fail/fail.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(
      this.loginForm.controls.email.value,
      this.loginForm.controls.password.value)
      .pipe(first())
      .subscribe(
        {
          next: res => {
            this._snackBar.openFromComponent(SuccessComponent, {
              duration: 5 * 1000
            });
            localStorage.setItem('euToken', res.Token);
            this.router.navigate(["/home", { outlets: { 'homeOutlet': ['catalogue'] } }]);
          },
          error: error => {
            console.log(error);
            this._snackBar.openFromComponent(FailComponent, {
              duration: 5 * 1000
            });
          }
        }
      );
  }

  openDialog() {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '600px'
    });
  }
}
