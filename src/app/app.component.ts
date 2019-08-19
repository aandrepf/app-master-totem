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
export class AppComponent implements OnDestroy {
  private _subInterface: Subscription;

  private urlServer: string;
  public versao: string;
  public up: boolean = null;

  constructor(
    router: Router,
    private _router: Router,
    private _userIdle: UserIdleService,
    private _http: HttpClient,
    private _interface: InterfaceService) {
      this._interface.getInterfaceContent().subscribe(
        data => sessionStorage.setItem('interface', JSON.stringify(data))
      );
      this._interface.getConfigUrl().subscribe(
        data => {
          this.urlServer = data;
          const source = interval(1 * 1000); // 10 - DEV / 1 - PROD
          this._subInterface = source.subscribe(() => {
            // this.getVersao();
          });
        }
      );
  }

  ngOnDestroy() {
    this._userIdle.stopWatching();
  }

  @HostListener('window:click') windowClick(): void { this._userIdle.resetTimer(); }

  /*
    RETORNA A INFORMAÇÃO DA VERSÃO DO EMISSOR
  */
  public getVersao() {
    const url = this.urlServer + Global.VERSAO_EMISSOR;
    this._http.get(url).subscribe(
      (data: VersaoEmissor) => {
        this.versao = data.ret;
      },
      error => {
        this.up = false;
        localStorage.setItem('subiu', JSON.stringify(false));
        console.error(error);
      },
      () => {
        this.up = true;
        localStorage.setItem('subiu', JSON.stringify(true));
        if(this._subInterface !== undefined) {
          this._subInterface.unsubscribe();
        }
      }
    );
  }
}
