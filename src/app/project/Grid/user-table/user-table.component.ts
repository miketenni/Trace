import { Component } from '@angular/core';
import {AgGridAngular} from 'ag-grid-angular';
import {AllCommunityModule, ColDef, ModuleRegistry, provideGlobalGridOptions} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { CommonService } from '../../common.service';

provideGlobalGridOptions({ theme: "legacy"});
ModuleRegistry.registerModules([AllCommunityModule]);
@Component({
  selector: 'app-user-table',
  imports: [AgGridAngular],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class UserTableComponent {
  receivedData:any[]=[];
  rowData:any[]=[];
  constructor(private service:CommonService){

  }

  ngOnInit(){
    this.service.currentData.subscribe(data => {
      this.receivedData = data;
      this.rowData=data;
    });
  }


  colDefs:ColDef[]=[
    {
      headerName: 'No',
      valueGetter: 'node.rowIndex + 1',
      width: 100
    },
    { headerName: 'Rule Name', field: 'ruleName', filter: true},
    { headerName: 'Schedule', field: 'Schedule', filter: true},
    { headerName: 'Active Type', field: 'activeType', filter: true},
    { headerName: 'Active User', field: 'activeUser', filter: true},
    { headerName: 'Alter', field: 'alter', filter: true},
    { headerName: 'Created Date', field: 'createdDate', filter: true},
    { headerName: 'Favourite', field: 'favourite', filter: true},
    {
      field: 'actions', // Doesn't need to exist in your data
      cellRenderer: (params: any) => {
        const editButton = `<button (click)="onEditClick(params.data)" class="btn btn-sm btn-primary">Edit</button>`;
        const deleteButton = `<button (click)="onDeleteClick(params.data)" class="btn btn-sm btn-danger ml-1">Delete</button>`; // Add margin for spacing
        return `${editButton} ${deleteButton}`; // Combine buttons
      },
      width: 120 // Set the width of the action column for better visibility
    }
  ]
}
