import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/api/users/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  constructor(public userService: UserService, public router:Router){

  }

  ngOnInit(){     
  };
  
login(form: NgForm){

  let data = form.value

  if(!data.password || !data.username) return alert("Debes llenaer todos los campos")
 
  try {
    this.userService.login(data).subscribe((data: any)=>{
      localStorage.setItem('token', data.token)
      this.router.navigate(["/home"])
    }, (err: any) => {
      alert("Error al inciar sesión")
    })
  } catch (error) {
    alert(error)
  }
  
}

}
