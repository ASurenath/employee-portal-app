import { Component, OnInit } from '@angular/core';
import { userSchema } from '../Models/userSchema';
import { ApiService } from '../services/api.service';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  searchKey: string = ""
  allUsers: userSchema[] = []
  page:number=1

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getAllUsers()
  }
  getAllUsers() {
    this.api.getAllUsersApi().subscribe({
      next: (result: any) => {
        this.allUsers = result
        console.log(result);
      },
      error: (reason: any) => {
        console.log(reason);
      }
    })
  }
  deleteUser(id: any) {
    this.api.removeUserApi(id).subscribe({
      next: (res: any) => {
        this.getAllUsers()
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
  generatePdf(){
    let pdf=new jsPDF()
    let head=[['EmpId','Username','Email','Status']]
    let body=this.allUsers.filter((i:any)=>i.id!="1").map((i:any)=>[i.empId,i.name,i.email,i.status])
    pdf.setFontSize(16)
    pdf.text("All users",10,10)
    autoTable(pdf,{head,body})
    pdf.output('dataurlnewwindow')
    pdf.save('allusers.pdf')
  }
  sortById(){
    this.allUsers.sort((user1:any,user2:any)=>user1.empId?.localeCompare(user2?.empId))
  }
  sortByName(){
    this.allUsers.sort((user1:any,user2:any)=>user1.name?.localeCompare(user2?.name))
  }
}
