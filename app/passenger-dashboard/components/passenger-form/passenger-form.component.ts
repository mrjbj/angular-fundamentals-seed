import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Passenger } from '../../models/passenger.interface';
import { Baggage } from '../../models/baggage-interface';

// QUESTION: why is { FormsModule } not needed to be imported here? 
// QUESTION: why does toggleCheckIn($event) pass in event.value (a boolean) rather than event object?
// NOTE: 
// 1. template driven forms will automatically add properties to ngModel
// object based upon the value assigned to the 'name' attribute of input tag. 
// 2. we can initialize the ngModel attributes via a property binding as in 
// [ngModel] = 'detail.fullname'.  This just sets initial value, that's all. 
// 3. for <input> type "radio", successive input tags with same "name" attribute
// will be considered to belong to same radio button group.  Can set the initial value
// via the "value" attribute, which should be a boolean. 
// 4. for <input> type "selected", 'value' property is the value you want to save 
// to database, 'selected' property is how you can set default value. Alternatively, 
// can use ngValue to do both the 'value' and 'selected' assignments for you.
// 5. use of template variable like '#fullname = "ngModel"' gives us access to the ngModel
// context which, in turn, gives us access to additional properties there, like 'errors' or 
// 'dirty' or 'required', etc.  fullname.errors.required yeilds the ngForm values, not the
// underlying details object. Safe operator '?' is used in case DOM object is null (not 
// available), so required works for NULL and for EMPTY.  Dirty is in there so that 
// form does not show errors when first up with blank entries as with addition of new row.
// 6. for button where type=sumbit, don't need to add in a (click) event handler, the 
// ngForms module does this for us.  

@Component({
    selector: 'passenger-form',
    styleUrls: ['passenger-form.component.scss'],
    template: `
        <form (ngSubmit)="handleSubmit(form.value, form.valid)" #form="ngForm" novalidate>
            <div>
                Passenger Name: 
                <input 
                    type="text"
                    name = "fullname" 
                    required
                    #fullname = "ngModel"
                    [ngModel] = "detail?.fullname" >
                <div *ngIf="fullname.errors?.required && fullname.dirty" class="error" >
                    Passenger name is required
                </div>
            </div>
             <div>
                Passenger ID: 
                <input 
                    type="number"
                    name = "id" 
                    required
                    #id="ngModel"
                    [ngModel] = "detail?.id" >
                <div *ngIf="id.errors?.required && id.dirty" class="error" >
                    ID is required
                </div>
            </div>
            <div>
                <label>
                    <input
                        type="radio"
                        [value]="true"
                        name="checkedIn"
                        [ngModel] = "detail?.checkedIn"
                        (ngModelChange) = "toggleCheckIn($event)">
                    Yes
                </label>
                <label>
                    <input
                        type="radio"
                        [value]="false"
                        name="checkedIn"
                        [ngModel] = "detail?.checkedIn"
                        (ngModelChange) = "toggleCheckIn($event)">
                    No
                </label>
            </div>
            <div>
                <label>
                    <input 
                        type="checkbox"
                        name="checkedIn"
                        [ngModel] = "detail?.checkedIn"
                        (ngModelChange) = "toggleCheckIn($event)">
                    Checked In
                </label>
            </div>
            <div *ngIf="form.value.checkedIn">
                Check In Date: 
                <input 
                    type="number"
                    name="checkInDate"
                    [ngModel] = "detail?.checkInDate">
            </div>
            <div>
                <select
                    name="baggage"
                    [ngModel] = "detail?.baggage">
                    <option
                        *ngFor="let item of baggage"
                        [value]="item.key"
                        [selected]="item.key === detail?.baggage">
                        {{item.value}}
                    </option>
                </select>
            </div>
            <button type="submit" [disabled]="form.invalid" >
                Update Passenger
            </button>
            <div> Valid: {{ form.valid | json }} </div>
            <div> Invalid: {{ form.invalid | json }} </div>
            <div> {{ form.errors | json }} </div>
        </form>  
    `
})
export class PassengerFormComponent {
    @Input()
    detail: Passenger;

    @Output()
    update: EventEmitter<Passenger> = new EventEmitter<Passenger>();    

    baggage: Baggage[] = [{
        key: 'none', 
        value: 'No Baggage'
    }, {
        key: 'hand-only',
        value: 'Hand Baggage'
    }, {
        key: 'hold-only',
        value: 'Hold Baggage'
    }, {
        key: 'hand-hold',
        value: 'Hand & Hold Baggage'
    }];

    toggleCheckIn(checkedIn: boolean) {
        if (checkedIn) {
            this.detail.checkInDate = Date.now();
        }
    }
    // passing isValid in because of security risk.  
    // it's possible to remove a disabled attribute from element using debugging tools
    // within browswer
    handleSubmit(passenger: Passenger, isValid: boolean) {
        if (isValid) {
            this.update.emit(passenger);
        }
    }
};



