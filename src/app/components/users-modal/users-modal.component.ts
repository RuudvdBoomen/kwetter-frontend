import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-users-modal',
  templateUrl: './users-modal.component.html',
  styleUrls: ['./users-modal.component.scss']
})
export class UsersModalComponent implements OnInit {
  title: string;
  users: User[];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  initFollowing(username: string) {
    this.title = 'Following'
    this.userService.getFollowing(username).subscribe(data => this.users = data);
  }

  initFollowers(username: string) {
    this.title = 'Followers'
    this.userService.getFollowers(username).subscribe(data => {
      this.users = data;
    });
  }

  getProfile(user: User) {
    this.router.navigateByUrl('/profile/' + user.username);
  }

}
