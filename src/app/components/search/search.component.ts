import { Component, OnInit } from '@angular/core';
import { Kweet } from 'src/app/models/kweet';
import { KweetService } from 'src/app/services/kweet/kweet.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchResults: Kweet[];
  search: string;

  constructor(private kweetService: KweetService, private authService: AuthService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    delete this.searchResults;
    this.getSearchResults();
  }

  getSearchResults() {
    this.route.paramMap.subscribe(params => {
      if (params.get("search")) {
        this.search = params.get("search")
      }
    });

    if (this.checkLoggedIn()) {
      this.kweetService.getKweetByContent(this.search).subscribe(data => {
        if (data.length > 0) {
          this.searchResults = data;
        }
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
