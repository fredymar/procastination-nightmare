export class Event {

  //atributos
  active?: boolean
  createdAt?: any // para saber ne que fecha se crea el producto
  updatedAt?: any
  id?: string
  tittle?: string
  dateStart?: string
  dateEnd?: string
  description?: string
  _id?: string

  constructor(
      active = false,
      createdAt = '',
      updatedAt = '',
      id = '',
      tittle = '',
      dateStart = '',
      dateEnd = '',
      description = '',
      _id = ''
  ) {
      this.active = active;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.id = id;
      this.tittle = tittle;
      this.dateStart = dateStart;
      this.dateEnd = dateEnd;
      this.description = description;
      this._id = _id;
  }

}
