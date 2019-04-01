import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user';
import { KweetComponent } from '../kweet/kweet.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  @ViewChild(KweetComponent)
  kweetComponent: KweetComponent;

  user: User;

  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.authService.isLoggedIn() && localStorage.getItem("username") != null) {
      this.userService.getProfile(localStorage.getItem("username")).subscribe(data => this.user = data)
    } else {
      this.router.navigateByUrl('/login');
    }
  }

}
