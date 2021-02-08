import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { SuccessComponent } from '../snack/success/success.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private authService: AuthService,
    private dialogRef: MatDialogRef<RegisterComponent>
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  Register(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.authService.register(
      this.registerForm.controls.firstname.value,
      this.registerForm.controls.lastname.value,
      this.registerForm.controls.email.value,
      this.registerForm.controls.password.value)
      .subscribe(
        {
          next: res => {
            this._snackBar.openFromComponent(SuccessComponent, {
              duration: 5 * 1000
            });
            this.dialogRef.close();
          },
          error: error => {
            this._snackBar.openFromComponent(SuccessComponent, {
              duration: 5 * 1000
            });
          }
        }
      );
  }
}
