import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { userSchema } from '../Models/userSchema';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  // id: string = ""
  user: userSchema = {}
  constructor(private route: ActivatedRoute, private api: ApiService, private toast:ToastrService) { }
  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      console.log(res);
      const { id } = res
      this.getUserDetails(id)
    })
  }
  getUserDetails(id: string) {
    this.api.getSingleUserApi(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.user = res
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
  cancel(userId: any) {
    this.getUserDetails(userId)
  }
  update(userId: any) {
    this.api.updateUserApi(userId, this.user).subscribe({
      next: (res: any) => {
        this.toast.success("User details updated successfully")
      },
      error: (err: any) => {
        this.toast.error(err.message);
      }
    })
  }
}
