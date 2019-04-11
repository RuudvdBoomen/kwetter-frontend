import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-modal',
  templateUrl: './users-modal.component.html',
  styleUrls: ['./users-modal.component.scss']
})
export class UsersModalComponent implements OnInit {
  title: string;
  users: string[];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  initFollowing() {
    this.title = 'Following'
    this.userService.getFollowing(localStorage.getItem("username")).subscribe(data => this.users = data);
  }

  initFollowers() {
    this.title = 'Followers'
    this.userService.getFollowers(localStorage.getItem("username")).subscribe(data => this.users = data);
  }

  getProfile(user: string) {
    console.log('hoi' + user)
    this.router.navigateByUrl('/profile/' + user);
  }

}
