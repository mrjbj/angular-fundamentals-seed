import { Component, OnInit } from '@angular/core';
import { Passenger } from '../../models/passenger.interface';
import { PassengerDashboardService } from '../../passenger-dashboard.service';

@Component({
    selector: 'passenger-dashboard',
    styleUrls: ['passenger-dashboard.component.scss'],
    // [items] is a property defined in passenger-count component, so 
    // [items] = "passengers" is passing data down(from passenger-dashboard to passenger-count)
    // [detail] is property defined in passenger-detail component. 
    // passengers is a property defined here, in passenger-dashboard, 
    // @Component is decorating that class, so 'passengers' property is in local scope. 
    // [items] and [detail] is binding to custom property, so need to decorate that 
    // attribute in the child class with @Input to flag it as a bindabnle from parents.
    // 'remove' is property defined in passenger-detail that emits events. 
    // (remove) means to listen for remove events and handle them here in passenger-dashboard. 
    template: `
     <div>
        <passenger-count
            [items] = "passengers">
        </passenger-count>
        <div *ngFor="let passenger of passengers;">
            {{ passenger.fullname }}
        </div>
         <passenger-detail
            *ngFor="let passenger of passengers;"
            [detail]="passenger"
            (edit)="handleEdit($event)"
            (remove)="handleRemove($event)">
        </passenger-detail>       
    </div>
    `
})
   

export class PassengerDashboardComponent implements OnInit{
    passengers: Passenger[];
    constructor(private passengerService: PassengerDashboardService) {
        // the 'private' keyword essentially creats a local propertly as if
        // this.passengerService = passengerService 
        // had been typed.
     };
    ngOnInit() {
        console.log('ngOnInit called');
        this.passengers = this.passengerService.getPassengers();
        
    }
    handleEdit(event: Passenger) {
        this.passengers = this.passengers.map((passenger: Passenger) => {
            if (passenger.id === event.id) {
                // we are on the passenger that event says might have been edited
                passenger = Object.assign({}, passenger, event);
            }
            return passenger;
        })
    }
    handleRemove(event: Passenger) {
        this.passengers = this.passengers.filter(
            (passenger: Passenger) => passenger.id !== event.id);
    }
}