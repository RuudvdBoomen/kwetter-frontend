import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService, private renderer: Renderer2) {
    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  nav(url: string, element: string) {
    if (url === 'profile') {
      if (localStorage.getItem('username') != null) {
        this.router.navigateByUrl('/profile/' + localStorage.getItem('username'));
      }
    } else {
      this.router.navigateByUrl('/' + url);
    }
    if (document.getElementsByClassName('selected')[0]) {
      this.renderer.removeClass(document.getElementsByClassName('selected')[0], 'selected');
    }
    if (element) {
      this.renderer.addClass(document.getElementsByClassName(element)[0], 'selected');
    }
  }

  search() {
    if (this.searchForm.invalid) {
      return;
    }
    this.router.navigateByUrl('/search/' + this.searchForm.controls.search.value);
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
