import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  userDetailsForm!:FormGroup;

  constructor(public fb:FormBuilder){

  }

  ngOnInit(){
    this.initialForm();
  }

  initialForm(){
    this.userDetailsForm=this.fb.group({
      ruleName:[''],
      activeUser:[''],
      activeType:[''],
      favourite:[''],
      createdDate:[''],
      Schedule:['']
    })
  }
}
