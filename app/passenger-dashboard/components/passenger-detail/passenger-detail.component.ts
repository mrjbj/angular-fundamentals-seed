import { Component, Input, Output, EventEmitter } from '@angular/core'
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
        <div class="children">
            Children: {{detail.children?.length || 0 }}
        </div>
        <button (click)="toggleEdit()">
            {{editing ? 'Done' : 'Edit'}}
        </button> 
        <button (click)="onRemove()">
           Remove
        </button>
    </div>
  `  
})

export class PassengerDetailComponent {
    // PROPERTIES
    editing: boolean = false;
    
    @Input()  // tag 'detail' property as bindable from selector (e.g. <passenger-detail>)
    detail: Passenger;
    
    // EVENTS
    // tag 'remove' as property emitted up to selector (e.g. <passenger-detail>
    // class that has <passenger-detail> in its template will need to handle
    // the event via function defined int he parent class locally)
    @Output()
    remove: EventEmitter<any> = new EventEmitter();   
    @Output()
    edit: EventEmitter<any> = new EventEmitter();    

    // FUNCTIONS
    constructor() { }

    onNameChange(value: string) {
        this.detail.fullname = value; 
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
