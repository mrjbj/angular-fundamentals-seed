import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';



import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Passenger } from './models/passenger.interface';
const PASSENGER_API: string = '/api/passengers'; // QUESTION: where is route '/api/passengers' configured?

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
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json()));
    }
    getPassenger(id: number): Observable<Passenger> {
        return this.http
            .get(`${ PASSENGER_API }/${id}`)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json()));
    }
    updatePassenger(passenger: Passenger): Observable<Passenger> {
        let options = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json' })
        });
        return this.http
            .put(`${PASSENGER_API}/${passenger.id}`, passenger, options)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json()));
    }
    removePassenger(passenger: Passenger): Observable<Passenger> {
        return this.http
            .delete(`${PASSENGER_API}/${passenger.id}`)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json()));
    }
}