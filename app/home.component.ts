import { Component } from '@angular/core';


// NOTE: to be a valid web component, selector must contain a '-' (e.g. app-home, not just home)
@Component({
    selector: 'app-home',
    template: `
        <div>
            Airline Passenger Demo Application
        </div>
    `
})
export class HomeComponent {}