import { Component, OnInit, Input } from '@angular/core';
import { Kweet } from 'src/app/models/kweet';

import { KweetService } from 'src/app/services/kweet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kweet',
  templateUrl: './kweet.component.html',
  styleUrls: ['./kweet.component.scss']
})
export class KweetComponent implements OnInit {
  @Input('parentData') public kweet: Kweet;

  constructor(private kweetService: KweetService, private router: Router) { }

  ngOnInit() {
  }

  owner(): boolean {
    if (this.kweet.createdBy == localStorage.getItem("username")) {
      return true
    }
    return false;
  }

  likeKweet() {
    if (localStorage.getItem("username") != null) {
      this.kweetService.likeKweet(this.kweet.id, localStorage.getItem("username"))
        .subscribe(data => { this.kweet.likes++; }, error => { })
    } else {
      console.log('your not logged in')
    }
  }

  deleteKweet() {
    if (localStorage.getItem("username") != null) {
      this.kweetService.deleteKweet(this.kweet.id)
        .subscribe(data => {
          delete this.kweet;
          console.log(this.kweet);
        }, error => { })
    } else {
      console.log('your not logged in')
    }
  }

  getProfile() {
    this.router.navigateByUrl('/profile/' + this.kweet.createdBy);
  }

}
