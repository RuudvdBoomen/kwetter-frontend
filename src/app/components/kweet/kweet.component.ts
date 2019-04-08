import { Component, OnInit, Input } from '@angular/core';
import { Kweet } from 'src/app/models/kweet';

import { KweetService } from 'src/app/services/kweet.service';

@Component({
  selector: 'app-kweet',
  templateUrl: './kweet.component.html',
  styleUrls: ['./kweet.component.scss']
})
export class KweetComponent implements OnInit {
  @Input('parentData') public kweet: Kweet;

  constructor(private kweetService: KweetService) { }

  ngOnInit() {
  }

  likeKweet() {
    if (localStorage.getItem("username") != null) {
      this.kweetService.likeKweet(this.kweet.id, localStorage.getItem("username"))
        .subscribe(data => { this.kweet.likes++; }, error => { })
    } else {
      console.log('your not logged in')
    }
  }

}
