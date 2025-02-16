import { Component } from '@angular/core';
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

provideGlobalGridOptions({ theme: 'legacy' });
ModuleRegistry.registerModules([AllCommunityModule]);
@Component({
  selector: 'app-user-table',
  imports: [AgGridAngular],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css',
})
export class UserTableComponent {
  receivedData: any[] = [];
  rowData: any[] = [];
  private gridApi!: GridApi<any>;
  constructor(private service: CommonService) {}

  ngOnInit() {
    this.rowData = JSON.parse(sessionStorage.getItem('FormDetailsArray') || '[]');
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
    console.log(data);
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
}
