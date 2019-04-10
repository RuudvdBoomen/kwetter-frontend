import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kwetter-frontend';

  loggedIn: boolean;

  constructor(private router: Router) { }

  loginPage(): boolean {
    return this.router.url == '/login';
  }

}
