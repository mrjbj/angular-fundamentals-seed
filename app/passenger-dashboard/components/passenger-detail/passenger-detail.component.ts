import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core'
import { Passenger } from '../../models/passenger.interface';

@Component({
    selector: 'passenger-detail',
    styleUrls: ['passenger-detail.component.scss'],
    template: `
    <div>
        <span class="status" [class.checked-in] = "detail.checkedIn" ></span>
        <div *ngIf="editing">
            <input 
                type="text" 
                [value]="detail.fullname"
                (input) = 'onNameChange(name.value)'
                #name >
        </div> 
        <div *ngIf="!editing">
            {{ detail.fullname }}
        </div>
        <div class="date" >
            Check in date:
            {{ detail.checkInDate ? (detail.checkInDate | date: 'yMMMd') : 0 }}
        </div>
        <button (click)="toggleEdit()">
            {{editing ? 'Done' : 'Edit'}}
        </button> 
        <button (click)="onRemove()">
           Remove
        </button>
        <button (click)="gotoPassenger()">
           View
        </button>
    </div>
  `  
})


// OnChanges keeps events from firing until done button clicked.    
export class PassengerDetailComponent implements OnChanges {
    // PROPERTIES
    editing: boolean = false;
    
    @Input()  // tag 'detail' property as bindable from selector (e.g. <passenger-detail>)
    detail: Passenger;
    
    // EVENTS
    // tag 'remove' as property emitted up to selector (e.g. <passenger-detail>
    // class that has <passenger-detail> in its template will need to handle
    // the event via function defined int he parent class locally)
    @Output()
    remove: EventEmitter<Passenger> = new EventEmitter<Passenger>();   
    @Output()
    edit: EventEmitter<Passenger> = new EventEmitter<Passenger>();    
    @Output()
    view: EventEmitter<Passenger> = new EventEmitter<Passenger>();    

    
    // FUNCTIONS
    constructor() { }
    // fires whenever angular detects changes to a property tagged as @Input. 
    // Passenger is passed down from dashboard component and held in 
    // the local 'details' variable. Because passed by reference, any changes made
    // here in this component will be reflected in the parent immediately.  To avoid this
    // (and update parent only after 'done' button pressed, we make a new object via 
    // Object.assign({}) and clone the currentValue object into it, thus having a local
    // copy now to work on.  Once 'done' hit, the emit(detail) passes this object back
    // up to parent for it to update local storage at that time. 
    ngOnChanges(changes) {
        if (changes.detail) {
            this.detail = Object.assign({}, changes.detail.currentValue);
        }
    }

    onNameChange(value: string) {
        this.detail.fullname = value; 
    }
    gotoPassenger() {
        this.view.emit(this.detail);
    }
    toggleEdit() {
        if (this.editing) {
            this.edit.emit(this.detail);
        }
        this.editing = !this.editing;
    }
    onRemove() {
        this.remove.emit(this.detail);
    }

}
