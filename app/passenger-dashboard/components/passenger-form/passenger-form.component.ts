import { Component, Input } from '@angular/core';
import { Passenger } from '../../models/passenger.interface';

// QUESTION: why is { FormsModule } not needed to be imported here? 
// NOTE: template driven forms will automatically add properties to ngModel
// object based upon the value assigned to the 'name' attribute of input tag. 
// we can initialize the ngModel attributes via a property binding as in 
// [ngModel] = 'detail.fullname'

@Component({
    selector: 'passenger-form',
    styleUrls: ['passenger-form.component.scss'],
    template: `
        <form #form="ngForm" novalidate>
            {{ detail | json }}
            <div>
                Passenger Name: 
                <input 
                    type="text"
                    name = "fullname" 
                    [ngModel] = "detail?.fullname" >
            </div>
             <div>
                Passenger ID: 
                <input 
                    type="number"
                    name = "id" 
                    [ngModel] = "detail?.id" >
            </div>
            {{form.value | json}}
        </form>  
    `
})
export class PassengerFormComponent {
    @Input()
    detail: Passenger;



};



