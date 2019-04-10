import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  username: String;
  user: User;

  constructor(private userService: UserService, private authService: AuthService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.get("username")) {
        this.username = params.get("username")
      }
    });

    if (this.authService.isLoggedIn() && localStorage.getItem("username") != null) {
      this.userService.getProfile(this.username).subscribe(data => {
        this.user = data;
        console.log(data);
      })
    } else {
      this.router.navigateByUrl('/login');
    }
  }

}
