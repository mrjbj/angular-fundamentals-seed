import { Component } from "@angular/core";

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
    <div class="app"> 
     
       <input 
          type="text" 
          #username
          [value] = "name"
          (input) = "handleChange($event.target.value)" />
      <div *ngIf="name.length >3 ">
        Searching for... {{ name}}
      </div>
      <div>
       <button (click) = "handleClick(username.value)">Get Value</button>
       </div>
    </div>
  `
})
export class AppComponent {
  name: string = '';

  handleChange(value: string) {
    this.name = value;
  }

  handleClick(value: string) {
    if (value.length) 
      this.name = ""  
    else
      this.name = '<start typing>'  
  }
  
}