import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Passenger } from './models/passenger.interface';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


// QUESTION: where is route '/api/passengers' come from?
const PASSENGER_API: string = '/api/passengers'; 

// QUESTION
// @Injectable is required here but not in dashboard component... why?
// I think it's because Http is an 'external dependency' for PassengerDashboardService
// whereas PassengerDashboardService is not a dependence for PassengerDashboardComponent
// don't understand why it's a dependency in one case and not the other
// video says to mark all cases as @Injectalbe to remove all doubt.  
@Injectable()   
export class PassengerDashboardService {
    constructor(private http: Http) { }

    getPassengers(): Observable<Passenger[]> {
        return this.http
            .get(PASSENGER_API)
            .map((response: Response) => response.json());
    }
    updatePassenger(passenger: Passenger): Observable<Passenger> {
        return this.http
            .put(`${PASSENGER_API}/${passenger.id}`, passenger)
            .map((response: Response) => response.json());
    }
    removePassenger(passenger: Passenger): Observable<Passenger> {
        return this.http
            .delete(`${PASSENGER_API}/${passenger.id}`)
            .map((response: Response) => response.json());
    }
}