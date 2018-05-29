// "Smart", stateful component that first retrieves a specified passenger object 
// from database via service, then pushes 'passenger' object down into 
// <passenger-form>, via the [detail] input binding, defined as 'detail' property 
// within the passenger-form class. 

import { Component, OnInit } from '@angular/core';
import { PassengerDashboardService } from '../../passenger-dashboard.service';
import { Passenger } from '../../models/passenger.interface';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';


// "smart" component pushes PassengerViewerComponent.passenger down into PassengerForm.detail
@Component({
    selector: 'passenger-viewer', 
    styleUrls: ['passenger-viewer.component.scss'],
    template: `
        <div>
            <button (click)="goBack()">
                &lsaquo; Go Back
            </button>
            <passenger-form
                [detail] = "passenger"
                (update) = "onUpdatePassenger($event)">
            </passenger-form>
        </div>
    `
})
export class PassengerViewerComponent implements OnInit {
    passenger: Passenger;
    constructor(
        private router: Router, 
        private route: ActivatedRoute, 
        private passengerService: PassengerDashboardService
        ) {}
    ngOnInit() {
        // route.params is an observable that emits new values whenever url changes
        // ngOnInit subscribes to this observeable and then switches via switchMap
        // to observe values emitted by getPassenger instead. 
        this.route.params
            .switchMap((data: Passenger) => this.passengerService.getPassenger(data.id))
            .subscribe((data: Passenger) => this.passenger = data);
    }
    onUpdatePassenger(alteredPassenger: Passenger) {
        console.log('From Passenger-Viewer', event);
        this.passengerService
            .updatePassenger(alteredPassenger)
            .subscribe((data: Passenger) => Object.assign({}, this.passenger, data));
    }
    goBack() {
        this.router.navigate(['/passengers']);  // imperative routing (string constant)
    }
}

