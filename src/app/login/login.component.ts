import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logInForm: FormGroup;
  errorMsg = false;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.logInForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {}

  login() {
    if (this.logInForm.valid) {
      this.userService
        .checkUserCredential(
          this.logInForm.getRawValue().userName,
          this.logInForm.getRawValue().password
        )
        .subscribe(res => {
          if (res.isExist) {
            this.router.navigate(['notes']);
            this.errorMsg = false;
          } else {
            this.errorMsg = true;
          }
        });
    }
  }
}
