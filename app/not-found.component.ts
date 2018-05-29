import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';


// NOTE: to be a valid web component, selector must contain a '-' (e.g. app-home, not just home)
@Component({
    selector: 'not-found',
    template: `
        <div>
           URL Not found  <a routerLink="/">Go Home</a>?
        </div>
    `
})
export class NotFoundComponent { }