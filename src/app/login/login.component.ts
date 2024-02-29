import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = ""
  password: string = ""
  constructor(private toastr: ToastrService, private api: AdminService, private router: Router) { }
  login() {
    if (this.email && this.password) {
      // this.toastr.success('proceed to API call')
      this.api.getAdminDetails().subscribe({
        next: (res: any) => {
          console.log(res);
          const { email, password } = res
          if (email == this.email && password == this.password) {
            this.toastr.success("Login Successful")
            sessionStorage.setItem("adminDetails", JSON.stringify(res))
            this.router.navigateByUrl('/dashboard')
            this.email = ""
            this.password = ""
          }
          else {
            this.toastr.error("Invalid email/password")
          }
        },
        error: (reason: any) => {
          this.toastr.error(reason.message)
        }
      })
    }
    else {
      this.toastr.warning('Please fill the form completely')
    }
  }
}
