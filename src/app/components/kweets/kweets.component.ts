import { Component, OnInit, Input } from '@angular/core';
import { Kweet } from 'src/app/models/kweet';

@Component({
  selector: 'app-kweets',
  templateUrl: './kweets.component.html',
  styleUrls: ['./kweets.component.scss']
})
export class KweetsComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('parentData') public kweets: Kweet[];

  constructor() { }

  ngOnInit() {
  }

}
