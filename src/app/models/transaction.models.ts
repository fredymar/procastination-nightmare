export class Transaction {

    //atributos
    type?: string
    value?: number


    constructor(
        type = '',
        value = 0,
    ) {
        this.type = type;
        this.value = value;
    }

}