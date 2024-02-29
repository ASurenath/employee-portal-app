import { Component, OnInit } from '@angular/core';
import { ApiService } from '../modules/users/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sideBarStatus: boolean = true
  mainColumnClass: string ="col-lg-10"
  userCount: number = 0
adminName:string="Admin"
  constructor(private userApi: ApiService, private router:Router) { }
  menuBtnClick() {
    this.sideBarStatus = !this.sideBarStatus
    this.mainColumnClass =this.sideBarStatus?"col-lg-10":"col-lg-12"

  }
  ngOnInit(): void {
    this.getUsersCount()
    this.adminName=JSON.parse(sessionStorage.getItem("adminDetails") || "").name
  }

  getUsersCount() {
    this.userApi.getAllUsersApi().subscribe({
      next: (result: any) => {
        this.userCount = result.length
        console.log(result);
      },
      error: (reason: any) => {
        console.log(reason);
      }
    })
  }
  updateAdminName(e:any){
this.adminName=e
  }
  logout(){
this.router.navigateByUrl('')
    sessionStorage.clear()
  }
}
