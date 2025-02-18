import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonService } from '../../common.service';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  userDetailsForm!: FormGroup;
  FormDetailsArray: any[] = [];
  editPatchValue:any;
  count: number = 1;

  constructor(public fb: FormBuilder, private service: CommonService,private router: Router) {}

  ngOnInit() {
    this.initialForm();
  }

  getEditForm(){
    this.editPatchValue = JSON.parse(
      sessionStorage.getItem('editUserForm') || '[]'
    );    
  }

  initialForm() {
    this.userDetailsForm = this.fb.group({
      id: [uuidv4()],
      ruleName: [''],
      activeUser: [''],
      activeType: [''],
      favourite: [''],
      alter: [''],
      createdDate: [''],
      Schedule: [''],
    });
  }

  onSave() {
    this.FormDetailsArray.push(this.userDetailsForm.value);
    sessionStorage.setItem(
      'FormDetailsArray',
      JSON.stringify(this.FormDetailsArray)
    );
    this.resetMethod();
  }

  resetMethod() {
    this.userDetailsForm.reset({
      id: uuidv4(), // Generate a new unique ID for the next entry
      ruleName: '',
      activeUser: '',
      activeType: '',
      favourite: '',
      alter: '',
      createdDate: '',
      Schedule: '',
    });
  }
}
