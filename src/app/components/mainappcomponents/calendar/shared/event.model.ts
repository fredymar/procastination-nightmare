export interface EventInputs {
  id?: string;
  title?: string;
  type?: string;
  active?: boolean;
  createdAt?: any;
  updatedAt?: any;
  start?: any;
  end?: any;
  description?: string;
  _id?: string;
  category?: string | any;
  isEditMode?: boolean;
  tareas?: {
    list: string;
    editable?: boolean;
  }[];
  classNames?: any
}

export class EventModel implements EventInputs {
  id?: string;
  title?: string;
  type?: string;
  active?: boolean;
  createdAt?: any;
  updatedAt?: any;
  start?: any;
  end?: any;
  description?: string;
  _id?: string;
  category?: string;
  isEditMode?: boolean;
  tareas?: { list: string; editable?: boolean }[];
  classNames?: any


  constructor(
    id = '',
    title = '',
    type = '',
    active = false,
    createdAt = '',
    updatedAt = '',
    start = '',
    end = '',
    description = '',
    _id = '',
    category = '',
    isEditMode = true,
    tareas = [],
    classNames = ''
  ) {
    this.id = id;
    this.title = title;
    this.type = type;
    this.active = active;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.start = start;
    this.end = end;
    this.description = description;
    this._id = _id;
    this.category = category;
    this.isEditMode = isEditMode;
    this.tareas = tareas;
    this.classNames = classNames;
  }
}
