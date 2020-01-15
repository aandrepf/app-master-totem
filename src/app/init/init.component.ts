import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css']
})
export class InitComponent implements OnInit {
  @Input() show = true;

  constructor(private _route: Router) {}

  ngOnInit() {}

  initAttendace() {
    this._route.navigate(['/interface']);
  }

}
