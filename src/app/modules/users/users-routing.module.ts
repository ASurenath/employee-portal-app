import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

// http://localhost:4200/users
const routes: Routes = [
  { path: '', component: UsersListComponent },
  {path:'add',component:AddComponent},
  {path:'edit/:id',component:EditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
