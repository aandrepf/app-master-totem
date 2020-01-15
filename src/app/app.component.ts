import { Component, HostListener, OnDestroy } from '@angular/core';
import { Router, NavigationStart, RouterEvent } from '@angular/router';
import { UserIdleService } from 'angular-user-idle';
import { HttpClient } from '@angular/common/http';
import { InterfaceService } from './services/interface.services';
import { VersaoEmissor } from './models/configs.model';
import { Global } from './app.globals';
import { interval, Subscription, using } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // @HostListener('window:click') windowClick(): void { this._userIdle.resetTimer(); }
}
