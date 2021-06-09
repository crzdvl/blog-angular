import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../../core/services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  loading = false;
  submitted = false;

  Roles: Array<any> = [
    { name: 'user', value: 'user', checked: false },
    { name: 'blogger', value: 'blogger', checked: false },
  ];

  nameRegx = /^[a-zA-Z ]+$/;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {
    if (this.authService.currentUserValue) { 
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(this.nameRegx)]],
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      password: [null, Validators.required, , Validators.minLength(6)],
      roles: this.formBuilder.array([], [Validators.required])
    });
  }

  onCheckboxChange(role: string, isChecked: boolean) {
    const rolesFormArray = <FormArray>this.signupForm.controls.roles;
    if (isChecked) {
      rolesFormArray.push(new FormControl(role));
    } else {
      let index = rolesFormArray.controls.findIndex(x => x.value == role)
      rolesFormArray.removeAt(index);
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.signup(this.signupForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/user']);
        },
        error => {
          this.loading = false;
        });
  }
}
