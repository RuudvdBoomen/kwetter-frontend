import { Component, OnInit, Input } from '@angular/core';
import { Kweet } from 'src/app/models/kweet';

@Component({
  selector: 'app-kweet',
  templateUrl: './kweet.component.html',
  styleUrls: ['./kweet.component.scss']
})
export class KweetComponent implements OnInit {
  @Input('parentData') public kweet: Kweet;

  constructor() { }

  ngOnInit() {
  }

}
