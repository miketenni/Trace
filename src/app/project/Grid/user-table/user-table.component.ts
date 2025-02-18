import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  AllCommunityModule,
  ColDef,
  GridApi,
  GridReadyEvent,
  ModuleRegistry,
  provideGlobalGridOptions,
} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { CommonService } from '../../common.service';
import { UserFormComponent } from '../../Forms/user-form/user-form.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

provideGlobalGridOptions({ theme: 'legacy' });
ModuleRegistry.registerModules([AllCommunityModule]);
@Component({
  selector: 'app-user-table',
  imports: [AgGridAngular,CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css',
})
export class UserTableComponent {
  @ViewChild(UserFormComponent)userFormComponent!: UserFormComponent;
  receivedData: any[] = [];
  rowData: any[] = [];
  isShowForm=false;
  editForm!:FormGroup;
  private gridApi!: GridApi<any>;
 

  constructor(private changeDec:ChangeDetectorRef,public fb:FormBuilder) {}

  ngOnInit() {
    this.initialEditForm();
    this.rowData = JSON.parse(
      sessionStorage.getItem('FormDetailsArray') || '[]'
    );
  }

  initialEditForm() {
    this.editForm = this.fb.group({
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

  colDefs: ColDef[] = [
    {
      headerName: 'No',
      valueGetter: 'node.rowIndex + 1',
      width: 100,
    },
    { headerName: 'Rule Name', field: 'ruleName', filter: true },
    { headerName: 'Schedule', field: 'Schedule', filter: true },
    { headerName: 'Active Type', field: 'activeType', filter: true },
    { headerName: 'Active User', field: 'activeUser', filter: true },
    { headerName: 'Alter', field: 'alter', filter: true },
    { headerName: 'Created Date', field: 'createdDate', filter: true },
    { headerName: 'Favourite', field: 'favourite', filter: true },
    {
      headerName: 'Actions',
      field: 'actions',
      cellRenderer: (params: any) => {
        const container = document.createElement('div');
        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.className = 'btn btn-sm btn-primary';
        editButton.addEventListener('click', () =>
          this.onEditClick(params.data)
        );
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.className = 'btn btn-sm btn-danger';
        deleteButton.addEventListener('click', () =>
          this.onDeleteClick(params.data)
        );
        container.appendChild(editButton);
        container.appendChild(deleteButton);
        return container;
      },
      width: 200,
    },
  ];

  gridOptions = {
    getRowId: (params: any) => params.data.id, // Set row ID properly
  };
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  onEditClick(data: any) {
    this.isShowForm=true
    this.changeDec.detectChanges();    
      this.editForm.patchValue({
      ruleName: data?.ruleName,
      activeUser: data?.activeUser,
      activeType: data?.activeType,
      favourite: data?.favourite,
      alter: data?.alter,
      createdDate: data?.createdDate,
      Schedule: data?.Schedule,
    })
    console.log(this.rowData);
    this.editForm.valueChanges.subscribe(() => { // Listen for changes
      const payload = {
        id: data?.id,
        ruleName: this.editForm.get('ruleName')?.value, // Use get()
        activeUser: this.editForm.get('activeUser')?.value,
        activeType: this.editForm.get('activeType')?.value,
        favourite: this.editForm.get('favourite')?.value,
        Schedule: this.editForm.get('Schedule')?.value,
        createdDate: this.editForm.get('createdDate')?.value,
        alter: this.editForm.get('alter')?.value
      };
      this.replaceObjectInArray(data?.id,payload)
      console.log(payload);
    })
    
  }


  

  // Method to remove and replace an object
replaceObjectInArray(idToRemove: string, newObject: any) {  
  const index = this.rowData.findIndex(item => item.id === idToRemove);
  if (index !== -1) {
    this.rowData.splice(index, 1);
    this.rowData.push(newObject);
    console.log(this.rowData);
         
  } 
}
  onDeleteClick(data: any) {
    if (!this.gridApi) {
      console.error('Grid API not available yet!');
      return;
    }
    this.rowData = this.rowData.filter((item) => item.id !== data?.id);
    console.log(this.rowData);
    this.gridApi.applyTransaction({ remove: [{ id: data.id }] });
  }

  onEditForm(){
    this.isShowForm=false
    this.changeDec.detectChanges();
  }

  
}
