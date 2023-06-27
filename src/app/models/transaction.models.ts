export class Transaction {

    //atributos
    type?: string
    value?: number
    description?: string


    constructor(
        type = '',
        value = 0,
        description = '',
    ) {
        this.type = type;
        this.value = value;
        this.description = description;
    }

}