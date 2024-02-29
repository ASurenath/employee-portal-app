import { Component } from '@angular/core';
import { userSchema } from '../Models/userSchema';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  user: userSchema = {}
  constructor(private api:ApiService, private toaster:ToastrService){}
  cancel() {
    this.user.email = ""
    this.user.empId = ""
    this.user.name = ""
    this.user.status = ""
  }
  addUser() {
    this.api.addUserApi(this.user).subscribe({
      next: (res: any) => {
        this.toaster.success("New employee added successfully")
        this.cancel()
      },
      error:(reason:any)=>{
        console.log(reason);
      }
    })
  }
}
