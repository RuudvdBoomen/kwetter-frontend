import { Component, OnInit } from '@angular/core';
import { KweetService } from 'src/app/services/kweet.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Kweet } from 'src/app/models/kweet';

@Component({
  selector: 'app-mentions',
  templateUrl: './mentions.component.html',
  styleUrls: ['./mentions.component.scss']
})
export class MentionsComponent implements OnInit {
  mentions: Kweet[];

  constructor(private kweetService: KweetService,
    private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.getMentions();
  }

  getMentions() {
    if (this.checkLoggedIn()) {
      console.log(localStorage.getItem("username"))
      this.kweetService.getMentions(localStorage.getItem("username")).subscribe(data => {
        this.mentions = data;
      })
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
