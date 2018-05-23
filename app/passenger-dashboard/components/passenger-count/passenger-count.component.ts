import { Component, Input } from '@angular/core'
import { Passenger } from '../../models/passenger.interface';

@Component({
    selector: 'passenger-count',
    template: `
        <div>
           <h3>Airline Passengers!</h3>
           <div>
                Total Passengers: {{checkedInCount() }} out of {{items.length}}
            </div>
        </div>
    `

})

export class PassengerCountComponent {
    @Input() // mark 'items' property as bindable from within <passenger-count> selector
    items: Passenger[];
    checkedInCount(): number {
        if (!this.items) return 0;
        return this.items.filter((passenger: Passenger) => passenger.checkedIn).length;
    }

}