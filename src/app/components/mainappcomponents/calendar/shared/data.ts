import { EventInput } from "@fullcalendar/core";
import { EventInputs } from "./event.model";


export const CALENDAREVENTS: EventInputs[] = [{
    id: '1',
    title: 'Meeting with Mr. Shreyu',
    start: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000),
    end: new Date(new Date().getTime() + 4 * 24 * 60 * 60 * 1000),
    classNames: ['bg-senary'],
    description: 'Reunion en la zona norte',
    category: ''

},
{
    id: '2',
    title: 'Interview - Backend Engineer',
    start: new Date(),
    classNames: ['bg-quaternary'],
    description: 'Reunion en la zona norte',
    category: ''

},
{
    id: '3',
    title: 'Phone Screen - Frontend Engineer',
    start: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
    end: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    classNames: ['bg-quinary'],
    description: 'Reunion en la zona norte',
    category: ''

},
{
    id: '4',
    title: 'Buy Design Assets',
    start: new Date(new Date().getTime() + 9 * 24 * 60 * 60 * 1000),
    end: new Date(new Date().getTime() + 12 * 24 * 60 * 60 * 1000),
    classNames: ['bg-septenary'],
    description: 'Reunion en la zona norte',
    category: ''

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
