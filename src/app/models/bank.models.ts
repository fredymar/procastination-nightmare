export class Bank {

    //atributos
    name?: string
    transaction?: Array<string>
    image?: string
    author?: string
    initial?: number
    description?:string


    constructor(
        name = '',
        transaction = [],
        image = '',
        author = '',
        initial= 0,
        description= '',
    ) {
        this.name = name;
        this.transaction = transaction;
        this.image = image;
        this.author = author;
        this.initial = initial
        this.description = description
    }

}