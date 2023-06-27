import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  urlApi = `${environment.API_URI}/user`
  userToCreate : User = new User()
  allUsers: User[] = []
  auth: any = {
    email: '',
    password: ''
  }


  constructor(private http: HttpClient) {     
   }


   // metodos que va a consumir el api
  getAllUsers(){
    return this.http.get(`${this.urlApi}/getAll`)
  }

  createUser(data : User){
    return this.http.post(`${this.urlApi}/create`, data)
  }

  deleteUser(_id:string){
    return this.http.delete(`${this.urlApi}/delete/${_id}`)
  }

  updateUser( data:User){
    let dataToUpdate = {
      _id: data._id,
      dataToUpdate : data
    }
    return this.http.put(`${this.urlApi}/update`, data)
  }

  login(data : any){
    return this.http.post(`${this.urlApi}/login`, data)
    
  }

  isLoggedIn(){
    return localStorage.getItem('token') ? true : false
  }

  decodeToken(): any{
    const token = localStorage.getItem('token')
    let decoded
    // validamos si el token existe y lo decodificamos
    try {
      decoded =jwtDecode(token ? token : "error")
    } catch (error) {
      decoded = false
    }
    return decoded
  }

  isAdmin(){
    let obj = this.decodeToken()
    return obj && obj.role === '1' ? true : false
  }
}
