import { Routes } from '@angular/router';
import { UserFormComponent } from './project/Forms/user-form/user-form.component';
import { UserTableComponent } from './project/Grid/user-table/user-table.component';

export const routes: Routes = [
    { path: '',   redirectTo: '/userForm', pathMatch: 'full' }, 
    {path:'userForm',component:UserFormComponent},
    {path:'userTable',component:UserTableComponent}
];
