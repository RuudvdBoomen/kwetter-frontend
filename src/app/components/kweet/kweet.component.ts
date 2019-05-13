import { Component, OnInit, Input } from '@angular/core';
import { Kweet } from 'src/app/models/kweet';

import { KweetService } from 'src/app/services/kweet/kweet.service';
import { Router } from '@angular/router';
import { formatDate, DatePipe } from '@angular/common';

@Component({
  selector: 'app-kweet',
  templateUrl: './kweet.component.html',
  styleUrls: ['./kweet.component.scss']
})
export class KweetComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('parentData') public kweet: Kweet;
  liked = false;

  constructor(private kweetService: KweetService, private router: Router) { }

  ngOnInit() {
    this.kweet.postedOn = new Date(this.kweet.postedOn.toString().slice(0, this.kweet.postedOn.toString().length - 5));
    this.userLiked();
  }

  userLiked() {
    this.kweetService.getKweetLikes(this.kweet.id)
      .subscribe(data => {
        data.forEach(user => {
          if (user.username === localStorage.getItem('username')) {
            this.liked = true;
          }
        });
      }, error => { });
  }

  owner(): boolean {
    if (this.kweet.createdBy === localStorage.getItem('username')) {
      return true;
    }
    return false;
  }

  likeKweet() {
    if (localStorage.getItem('username') != null) {
      this.kweetService.likeKweet(this.kweet.id, localStorage.getItem('username'))
        .subscribe(data => {
          this.kweet.likes++;
          this.liked = true;
        }, error => { });
    } else {
      console.log('your not logged in');
    }
  }

  unlikeKweet() {
    if (localStorage.getItem('username') != null) {
      this.kweetService.unlikeKweet(this.kweet.id, localStorage.getItem('username'))
        .subscribe(data => {
          this.kweet.likes--;
          this.liked = false;
        }, error => { });
    } else {
      console.log('your not logged in');
    }
  }

  deleteKweet() {
    if (localStorage.getItem('username') != null) {
      this.kweetService.deleteKweet(this.kweet.id)
        .subscribe(data => {
          delete this.kweet;
        }, error => { });
    } else {
      console.log('your not logged in');
    }
  }

  getProfile() {
    this.router.navigateByUrl('/profile/' + this.kweet.createdBy);
  }

}
