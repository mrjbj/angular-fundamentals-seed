// "Smart", stateful component that first retrieves a specified passenger object 
// from database via service, then pushes 'passenger' object down into 
// <passenger-form>, via the [detail] input binding, defined as 'detail' property 
// within the passenger-form class. 

import { Component, OnInit } from '@angular/core';
import { PassengerDashboardService } from '../../passenger-dashboard.service';
import { Passenger } from '../../models/passenger.interface';


// "smart" component pushes PassengerViewerComponent.passenger down into PassengerForm.detail
@Component({
    selector: 'passenger-viewer', 
    styleUrls: ['passenger-viewer.component.scss'],
    template: `
        <div>
            <passenger-form
                [detail] = "passenger"
                (update) = "onUpdatePassenger($event)">
            </passenger-form>
        </div>
    `
})
export class PassengerViewerComponent implements OnInit {
    passenger: Passenger;
    constructor(private passengerService: PassengerDashboardService) { }
    ngOnInit() {
        this.passengerService
            .getPassenger(1)
            .subscribe((data: Passenger) => this.passenger = data);
    }
    onUpdatePassenger(alteredPassenger: Passenger) {
        console.log('From Passenger-Viewer', event);
        this.passengerService
            .updatePassenger(alteredPassenger)
            .subscribe((data: Passenger) => Object.assign({}, this.passenger, data));
    }
}

