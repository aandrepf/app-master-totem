import { Component, OnInit, OnDestroy } from '@angular/core';
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
  public qtdBotoes: number;
  public load: boolean = false;

  private list = [];

  constructor(
    private _interface: InterfaceService,
    private _active: ActivatedRoute,
    private _route: Router,
    private spinner: NgxSpinnerService,
    private _userIdle: UserIdleService
    ) {
      _route.events.subscribe((event: RouterEvent) => {
        this.navigationInterceptor(event);
      });
    }

  ngOnInit() {
    // this.spinner.show();
    // verifica a cada 2 minutos se o JSON da interface atualizou
    this.subTimer = timer(0, 120 * 1000).subscribe((t: any) => {
      console.log('verificação de JSON iniciou');
      this.tickerFunc(t);
    });

    this.sub = this._active.params.subscribe(params => {
      // variavel que armazena o número da pagina vindo da url
      if (params['id'] === undefined) {
        this._interface.getInterfacePage(1);
      } else {
        this.page = +params['id'];
        this._interface.getInterfacePage(this.page);
      }

      // returna a estrutura da interface da pagina corrente
      let tela = JSON.parse(localStorage.getItem('interface'));
      if (tela !== null || tela !== undefined) {
        this.load = true;
        this.error = false;
        if (this.load) {
          this.loadInterface();
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.sub !== undefined) { this.sub.unsubscribe(); }
    if (this.subTimer !== undefined) { this.subTimer.unsubscribe(); }
  }

  public tickerFunc(tick: any) {
    const d = new Date(0, 0, 0, 0, 0, tick, 0);
    this.ticks = d.toString();
    this.ticks = this.ticks.substring(16, 24);
    this.spinner.show();
    this._interface.getInterfaceContent().subscribe(
    (data: InterfaceEmissor) => {
      if (data.interfaceEmissorPagina === undefined || data.interfaceEmissorPagina === null) {
        this.load = false;
        this.error = false;
      } else {
        sessionStorage.removeItem('interface');
        sessionStorage.setItem('interface', JSON.stringify(data.interfaceEmissorPagina));
        this.pagina = new Pagina();
        this.load = true;
        this.error = false;
        this.loadInterface();
      }
    },(error) => {
      this.load = false;
      this.error = true;
      this.spinner.hide();
    }, ()=> {
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

  public loadInterface() {
    this.pagina = JSON.parse(sessionStorage.getItem('interface'))
      .filter((item: Pagina) => item.id === this._interface.interfacePagina)[0];
    this.tituloPagina = this.pagina.interfaceEmissorTituloPagina;
    this.links = this.pagina.interfaceEmissorLink;
    this.botoes = this.pagina.interfaceEmissorBotao;

    this.contentPagina = JSON.parse(sessionStorage.getItem('interface')).map(
      (item: Pagina) => {
        return {
          pagina: item.id,
          totalBotao: item.interfaceEmissorBotao.length
      }
    });
  }

  public mostraLink(destino: number): string {
    let p = this.contentPagina.filter((item) => {
      return item.pagina === destino;
    });
    if(p[0].totalBotao === 0){
      return 'none';
    }
    return 'flex';
  }

  public navigate(origem: number, destino: number) {
    this._route.navigate(['/interface', destino]);
    this.list.push(origem, destino);
  }

  public previousPage() {
    this.list.pop();
    if (this.list.length === 0) {
      this._route.navigate(['/interface']);
    } else {
      this._route.navigate(['/interface', this.list[0]]);
    }
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

 public navigationInterceptor(event: RouterEvent): void {
  if (event instanceof NavigationStart) {
    const page = event.url.substring(11);
    this.verifyIdleUser(page);
  }
 }

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
