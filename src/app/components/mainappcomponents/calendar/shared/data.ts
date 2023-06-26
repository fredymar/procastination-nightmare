import { EventInput } from "@fullcalendar/core";
import { EventInputs } from "./event.model";






export const CALENDAREVENTS: EventInputs[] = [{
  id: '1',
  title: 'Reunión con Mr. Shreyu',
  start: new Date(new Date().getTime() + -7 * 24 * 60 * 60 * 1000),
  end: new Date(new Date().getTime() + -4 * 24 * 60 * 60 * 1000),
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et turpis quis magna dictum iaculis. Sed commodo dui ut pharetra vehicula. Fusce commodo non nunc a pellentesque. Duis volutpat faucibus rhoncus. Nullam tellus sapien, convallis sed arcu a, blandit dapibus eros. Nam egestas lorem massa, non tincidunt erat imperdiet in.',
  category: '',
  classNames: ['bg-senary'],
  tareas: [
    {
      list: "Duracion no mas de 1 hora",
    },
    {
      list: "Usar tecnicas de persuacion",
    },
  ]
},
{
  id: '2',
  title: 'Cambios - Backend Engineer',
  start: new Date(),
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce gravida feugiat consectetur. Integer volutpat auctor dapibus. Maecenas eu erat eu.',
  category: '',
  classNames: ['bg-quaternary'],
  tareas: [
    {
      list: "Usar Express con Mongo Db",
    },
    {
      list: "Crear las rutas para los diferentes componentes",
    },
  ]

},
{
  id: '3',
  title: 'Phone Screen - Frontend Engineer',
  start: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
  end: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin aliquam.',
  category: '',
  classNames: ['bg-quinary'],
  tareas: [
    {
      list: "Crear estilos para el movil, pc, portatil",
    },
    {
      list: "Realizar cambios en las imagenes",
    },
    {
      list: "Usar photoshop para disminuir el peso de las imagenes",
    },
    {
      list: "Ocultar los bordes de los inputs",
    },
  ]

},
{
  id: '4',
  title: 'Comprar accesorios para PC',
  start: new Date(new Date().getTime() + 9 * 24 * 60 * 60 * 1000),
  end: new Date(new Date().getTime() + 12 * 24 * 60 * 60 * 1000),
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac magna quis ante molestie commodo. Phasellus ac quam consectetur, congue ante vel, gravida magna. Proin.',
  category: '',
  classNames: ['bg-septenary'],
  tareas: [
    {
      list: "Hacer lista de precios de varios almacenes",
    },
    {
      list: "Comprar memoria ram por amazon",
    },
    {
      list: "Vender los componentes no usables",
    },
  ]

}];

// export const EXTERNALEVENTS: ExternalEvent[] = [
//     {
//         id: 1,
//         title: 'New Theme Release',
//         type: 'success'
//     },
//     {
//         id: 2,
//         title: 'My Event',
//         type: 'info'
//     },
//     {
//         id: 3,
//         title: 'Meet Manager',
//         type: 'warning'
//     },
//     {
//         id: 4,
//         title: 'Report Error',
//         type: 'danger'
//     }
// ]
