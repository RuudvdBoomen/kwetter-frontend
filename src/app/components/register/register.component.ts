import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  messageForm: FormGroup;
  submitted = false;
  loginError = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.messageForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      passwordRepeat: [['', Validators.required, Validators.minLength(4)]]
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;

    if (this.messageForm.invalid || this.messageForm.controls.password.value != this.messageForm.controls.passwordRepeat.value) {
      return;
    }

    let username = this.messageForm.controls.username.value;
    let password = this.messageForm.controls.password.value;

    this.authService.register({ username, email: this.messageForm.controls.email.value, password })
      .subscribe((data) => {
        this.router.navigateByUrl('/login');
      },
        error => {
          this.loginError = true;
        });
  }
}
