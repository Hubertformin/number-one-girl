import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../providers/seo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbService } from '../../providers/db.service';
import { IsLoadingService } from '@service-work/is-loading';
import { ToastService } from '../../providers/toast.service';

declare type PAYMENT_OPTIONS = 'MTN Mobile Money' | 'Orange Money';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private seo: SeoService, private fb: FormBuilder,
              private toast: ToastService,
              private loading: IsLoadingService,
              private db: DbService) { }

  ngOnInit(): void {
    this.seo.setSeoTags('Register as candidate', 'Register as a number one girl candidate', 'register, number on girl cameroon');
    // init form
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      phoneNumber: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      paymentMethod: ['', Validators.required]
    });
  }
  /*
  * Initializing getters
  * */
  get name_control() {
    return this.registerForm.get('name');
  }
  get email_control() {
    return this.registerForm.get('email');
  }
  get phoneNumber_control() {
    return this.registerForm.get('phoneNumber');
  }
  get payment_control() {
    return this.registerForm.get('paymentMethod');
  }
  get gender_control() {
    return this.registerForm.get('gender');
  }
  get dateOfBirth_control() {
    return this.registerForm.get('dateOfBirth');
  }
  /*
  * When form is submitted
  * */
  submitForm() {
    // console.log(this.registerForm.value);
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    // send request
    this.db.addContestantRequest(this.registerForm.value)
      .then(() => {
        this.registerForm.reset();
        this.toast.notify('Request sent');
      })
      .catch(err => {
        console.error(err);
        this.toast.notify('Failed to send request, please try again later');
      })
      .finally(() => {
        this.loading.remove();
      })
  }
}
