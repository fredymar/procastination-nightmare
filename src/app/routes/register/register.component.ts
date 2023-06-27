import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/api/users/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(public userService: UserService){}

  ngOnInit(){
    this.getAllUsers()
  }

  cleanForm(){
    this.userService.userToCreate = new User()
  }

  register(form: NgForm) {
    // revisar los campos
    let data = form.value;

    if(data._id){
      // actualizar
      console.log("entre")
      this.userService.updateUser(data).subscribe((data) => {
        alert("Usuario actualizado")        
      this.getAllUsers()
      })
      alert("Va a actualizar un usuario")
      this.cleanForm()
      return
    }

    //crear usuario
    delete(data._id)

    this.userService.createUser(data).subscribe((data: any) => {
      console.log({data})
      this.getAllUsers()
      this.cleanForm()
    });
  }


  createUser(form: NgForm){
    // revisar los campos
    let data = form.value
    this.userService.createUser(data).subscribe((data) => {
      console.log(data);
      this.getAllUsers()
      
    })
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe((data: any) => {
      this.userService.allUsers = data.result || []
      console.log(data);
      
    })
  }

  deleteUser(_id:string){
    this.userService.deleteUser(_id).subscribe(() => {
      alert("Usuario eliminado")
      this.getAllUsers()
    })
  }

  updateUser(user: User){
    this.userService.userToCreate = user
  }
}
