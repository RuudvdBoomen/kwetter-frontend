import { Component, OnInit, ViewChild } from '@angular/core';
import { KweetComponent } from '../kweet/kweet.component';

import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import { KweetService } from '../../services/kweet/kweet.service';

import { Router } from '@angular/router';
import { Kweet } from 'src/app/models/kweet';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hashtag } from 'src/app/models/hashtag';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  kweetForm: FormGroup;
  kweets: Kweet[];
  trendingHashtags: Hashtag[];

  constructor(private userService: UserService, private kweetService: KweetService,
    private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.kweetForm = this.formBuilder.group({
      kweet: ['', Validators.required],
    })

    kweetService.newKweets.subscribe(newKweet => {
      this.getTimeline();
    });
  }

  ngOnInit() {
    this.getTimeline();
    this.getTrendingHashtags();
  }

  getTrendingHashtags() {
    this.kweetService.getTrendingHashtags().subscribe(data => {
      this.trendingHashtags = data;
    }, error => { })
  }

  getTimeline() {
    if (this.checkLoggedIn()) {
      this.userService.getTimeline(localStorage.getItem("username")).subscribe(data => {
        this.kweets = data;
      })
    }
  }

  createKweet() {
    if (localStorage.getItem("username") != null && this.kweetForm.controls.kweet.value) {
      this.kweetService.createKweet({ content: this.kweetForm.controls.kweet.value }, localStorage.getItem("username"))
        .subscribe(data => {
          this.getTimeline();
          this.getTrendingHashtags();
        }, error => { })
    }
  }

  checkLoggedIn(): boolean {
    if (this.authService.isLoggedIn() && localStorage.getItem("username") != null) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
    }
  }

}
