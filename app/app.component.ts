
// 1. router-outlet is an angular directive.  it's job is to determine which selector
// should be active and then put the content from that component directly beneath itself. 
// router-outlet is a 0px by 0px placeholder. 
// 2. routerLink is an angular directive that accepts a string or databind defining the URL to match
// 3. note that [] needed around [routerLinkActiveOptions] for the object "{exact: true}" to 
// be intrepreted as a boolean rather than just a string. This prevents the active
// class from being assigned as true for "/", which would otherwise match everything.

import { Component } from "@angular/core";

interface Nav {
  link: string, 
  name: string, 
  exact: boolean
}

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
    <div class="app">
      <nav class="nav">
        <a 
          *ngFor="let item of nav"
          [routerLink]="item.link" 
          routerLinkActive="active"
          [routerLinkActiveOptions] = "{exact: item.exact}">
          {{item.name}}
        </a>
      </nav>
    <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  nav: Nav[] = [
    {
      link: '/',
      name: 'Home',
      exact: true
    }, 
    {
      link: '/oops',
      name: '404',
      exact: false
    },
    {
      link: '/passenger',
      name: 'Passenger',
      exact: false
    }
  ]
}