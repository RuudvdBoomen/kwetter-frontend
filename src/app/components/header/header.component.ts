import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required],
    })
  }

  ngOnInit() {
  }

  nav(url: string) {
    if (url == 'profile') {
      if (localStorage.getItem("username") != null) {
        this.router.navigateByUrl('/profile/' + localStorage.getItem("username"));
      }
    } else {
      this.router.navigateByUrl('/' + url);
    }
  }

  search() {
    if (this.searchForm.invalid) {
      return;
    }
    this.router.navigateByUrl('/search/' + this.searchForm.controls.search.value);
  }

}
