import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent implements OnInit {
 @Output() onAdminChange = new EventEmitter()
  adminDetails: any = {}
  editAdminStatus: boolean = false
  profilePic: string = "https://cdn-icons-png.flaticon.com/512/6830/6830335.png"
  constructor(private adminApi: AdminService, private toaster: ToastrService) { }
  editAdminBtn() {
    this.editAdminStatus = !this.editAdminStatus
  }
  ngOnInit(): void {
    this.adminApi.getAdminDetails().subscribe((res: any) => {
      this.adminDetails = res
      if (res.profilePic) {
        this.profilePic = res.profilePic
      }
    })
  }
  getFile(e: any) {
    let file = e.target.files[0]
    let fr = new FileReader()
    fr.readAsDataURL(file)
    fr.onload = (e: any) => {
      console.log(e.target.result);
      this.profilePic = e.target.result
      this.adminDetails.profilePic = e.target.result
    }
  }
  updateAdmin() {
    this.adminApi.updateAdminDetails(this.adminDetails).subscribe({
      next: (res: any) => {
        sessionStorage.setItem("adminDetails", JSON.stringify(res))
        this.onAdminChange.emit(res.name)
        this.toaster.success("Admin details updated successfully")
        this.editAdminStatus = false
      },
      error: (err: any) => {
        this.toaster.warning("Updation failed! Please try again later")
        console.log(err);

      }
    })
  }
}
