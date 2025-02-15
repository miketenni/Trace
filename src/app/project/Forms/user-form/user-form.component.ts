import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../../common.service';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  userDetailsForm!:FormGroup;
  FormDetailsArray:any[]=[];
  constructor(public fb:FormBuilder,private service:CommonService){

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
      alter:[''],
      createdDate:[''],
      Schedule:['']
    })
  }

  onSave(){
    this.FormDetailsArray.push(this.userDetailsForm.value)
    this.userDetailsForm.reset();
    console.log(this.FormDetailsArray);
    this.service.updateData(this.FormDetailsArray)
  }
}
