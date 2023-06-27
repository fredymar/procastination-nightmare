export class User {

    //atributos
      //atributos
    imagen?:string
    email?:string 
    name?: string
    password?:string
    _id?:string

    constructor(
        name = "",
        email = "",
        password = "",
        imagen = "",
        _id = ""
    ) {
        this.imagen = imagen;
        this.email = email;
        this.name = name;
        this.password= "";
        this._id
      }

}