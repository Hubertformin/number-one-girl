import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../providers/seo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../providers/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private seo: SeoService, private fb: FormBuilder,
              private router: Router,
              private toast: ToastService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.seo.setAdminTitle('Login');
  }
  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // hubert,
    }
  //  login
    if (this.loginForm.value.username === 'admin'
      && this.loginForm.value.password === 'password') {
      window.sessionStorage.setItem('au', 'admin');
      // redirect to admin
      this.router.navigate(['/admin']);
    } else {
      this.toast.notify('Wrong username or password');
    }
  }

}
