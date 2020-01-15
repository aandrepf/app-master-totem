import { Global } from './../app.globals';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent, NavigationStart } from '@angular/router';
import { Subscription, timer } from 'rxjs';

import { InterfaceService } from './../services/interface.services';
import { Pagina, TituloPagina, Link, Botao, InterfaceEmissor } from './../models/interface.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserIdleService } from 'angular-user-idle';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css', './../print/print.component.css']
})
export class InterfaceComponent implements OnInit, OnDestroy {
  private page: number;
  private ticks: string;
  private sub: Subscription;
  private subTimer: Subscription;

  public regexNegrito = /([*])(.+)/g;
  public error: boolean;
  public contentPagina: any[];
  public pagina: Pagina;
  public tituloPagina: TituloPagina[];
  public links: Link[];
  public botoes: Botao[];
  public load = false;
  public titlePaddingTop;
  public msgExtra;
  public previousButton;
  public pageNav;
  public timeIdle;

  private list = [1];

  constructor(
    private _interface: InterfaceService,
    private _active: ActivatedRoute,
    private _route: Router,
    private spinner: NgxSpinnerService,
    private _userIdle: UserIdleService
    ) {
      /* _route.events.subscribe((event: RouterEvent) => {
        this.navigationInterceptor(event);
      }); */
    }

  @HostListener('window:click') windowClick(): void {
    clearTimeout(this.timeIdle);
  }

  ngOnInit() {
    this.spinner.show();
    // verifica a cada 2 minutos se o JSON da interface atualizou
    this.subTimer = timer(0, 10 * 1000).subscribe((t: any) => {
      this.verificaInterface();
    });

    /* this.sub = this._active.params.subscribe(params => {
      // variavel que armazena o número da pagina vindo da url
      this.pageNav = isNaN(+params['id']) ? this._interface.getInterfacePage(1) : this._interface.getInterfacePage(+params['id']);
    }); */
  }

  ngOnDestroy() {
    if (this.sub !== undefined) { this.sub.unsubscribe(); }
    if (this.subTimer !== undefined) { this.subTimer.unsubscribe(); }
  }

  public verificaInterface() {
    this._interface.getInterfaceContent().subscribe(
    (data) => {
      if (!data) {
        this.load = false;
        this.error = false;
      } else {
        this.load = true;
        this.error = false;
        Global.PAGEITEM = data;
        this.contentPagina = data.map(
          (item: Pagina) => {
            return {
              pagina: item.id,
              totalBotao: item.interfaceEmissorBotao.length
          };
        });
        this.loadInterface(1);
        if (this.subTimer) { this.subTimer.unsubscribe(); }
      }
    }, (error) => {
      this.load = false;
      this.error = true;
      this.spinner.hide();
    }, () => {
      this.spinner.hide();
    });
  }

  public getPosicaoTexto(posicao: number): string {
    switch (posicao) {
      case 1:
        return 'right';
      case 2:
        return 'center';
      case 3:
        return 'left';
    }
  }

  public loadInterface(page: number) {
    this.pageNav = page;

    console.log(`estamos na pagina ${this.pageNav}`);

    let item: Pagina = Global.PAGEITEM.filter(p => p.id === this.pageNav)[0];
    this.pagina = item;

    this.tituloPagina = item.interfaceEmissorTituloPagina;
    this.titlePaddingTop = this.tituloPagina.length === 1 ? '27' : '0';
    this.previousButton = item.btnVoltar;
    this.links = item.interfaceEmissorLink;
    this.botoes = item.interfaceEmissorBotao;
    this.msgExtra = item.id === 1 ? item.msgExtra : '';

    if (page !== 1) {
      this.timeIdle = setTimeout(() => {
        this.loadInterface(1);
      }, 40 * 1000);
    } else {
      clearTimeout(this.timeIdle);
    }
  }

  public mostraLink(destino: number): string {
    let p = this.contentPagina.filter((item) => {
      return item.pagina === destino;
    });
    if (p[0].totalBotao === 0) {
      return 'none';
    }
    return 'flex';
  }

  // ACIONADO PELOS LINKS EXISTENTES
  public navigate(origem: number, destino: number) {
    // this._route.navigate(['/interface', destino]);
    // this.list.push(origem, destino);
    setTimeout(() => {
      this.list.push(destino);
      this.loadInterface(destino);
    }, 100);
  }

  // RETORNA UMA PAGINA ANTES
  public previousPage() {
    this.list.pop();
    console.log('previous rota', this.list);
    setTimeout(() => {
      let t = this.list.length;
      this.loadInterface(this.list[this.list.length - 1]);
      if (t === 1) { this.verificaInterface(); }
    }, 100);
  }

/*
  DIRECIONA PARA TELA DE IMPRESSÃO DE ACORDO COM IdBotao
  SETADO NO ELEMENTO HTML
*/
 public emitSenha(idBotao: number, tipo: number): void {
    if (tipo === 3) {
      console.log('Id botão destino : ', idBotao);
      this._route.navigate(['/print/botao', idBotao]);
    }
 }

 /* public navigationInterceptor(event: RouterEvent): void {
  if (event instanceof NavigationStart) {
    const page = event.url.substring(11);
    // this.verifyIdleUser(page);
  }
 } */

 /*
    VERIFICA SE USUARIO ESTÁ IDLE NA PAGINA
  */
 verifyIdleUser(id: string): void {
  this._userIdle.startWatching();
  if (id > '1') {
    this._userIdle.onTimerStart().subscribe(count => count == null ? console.log('não estou Idle') : console.log('contando ', count));
    this._userIdle.onTimeout().subscribe(() => {
      this._route.navigate(['/interface']);
    });
  }
  if (id === '1' || id === '') {
    console.log('aqui é a pagina inicial');
    this._userIdle.stopWatching();
    this._userIdle.stopTimer();
  }
 }
}
