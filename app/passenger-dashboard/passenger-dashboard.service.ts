import { Passenger } from './models/passenger.interface';

export class PassengerDashboardService {
    constructor() { }

    getPassengers():Passenger[] {
        return [{
            id: 1,
            fullname: 'Stephen',
            checkedIn: true,
            checkInDate: 149074200000,
            children: null
        }, {
            id: 2,
            fullname: 'Rose',
            checkedIn: false,
            checkInDate: null,
            children: [{ name: 'Ted', age: 12 }, { name: 'Chloe', age: 7 }]
        }, {
            id: 3,
            fullname: 'James',
            checkedIn: true,
            checkInDate: 147516654000,
            children: null
        }, {
            id: 4,
            fullname: 'Louise',
            checkedIn: true,
            checkInDate: null,
            children: [{ name: 'Jason', age: 54 }]
        }, {
            id: 5,
            fullname: 'Tina',
            checkedIn: false,
            checkInDate: null,
            children: null
        }];
    }
}