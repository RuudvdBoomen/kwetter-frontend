import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.authService.isLoggedIn() && localStorage.getItem("username") != null) {
      this.userService.getProfile(localStorage.getItem("username")).subscribe(data => {
        this.user = data;
        console.log(data);
      })
    } else {
      this.router.navigateByUrl('/login');
    }
  }

}
