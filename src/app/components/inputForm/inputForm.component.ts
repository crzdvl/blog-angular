import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'input-form',
  styleUrls: ['./inputForm.component.css'],
  templateUrl: './inputForm.component.html',
})
export class InputForm implements OnInit {
  @Input() formControlName: string = 'Name';
  @Input() formControl: FormControl;
  @Input() formGroup: FormGroup;

  ngOnInit(){
    this.formGroup = this.formBuilder.group({});
  }
}
