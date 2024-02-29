import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userSchema } from '../Models/userSchema';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
SERVER_URL="https://employee-portal-server-ro3p.onrender.com"
  constructor(private http:HttpClient) { }
  addUserApi(user:userSchema){
    return this.http.post(`${this.SERVER_URL}/users`,user)
  }
  getAllUsersApi(){
    return this.http.get(`${this.SERVER_URL}/users`)
  }
  getSingleUserApi(id:string){
    return this.http.get(`${this.SERVER_URL}/users/${id}`)
  }
  updateUserApi(id:string,userDetails:userSchema){
    return this.http.put(`${this.SERVER_URL}/users/${id}`,userDetails)
  }
  removeUserApi(id:string){
    return this.http.delete(`${this.SERVER_URL}/users/${id}`)
  }
}
