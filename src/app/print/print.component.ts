import { HttpClient } from '@angular/common/http';
import { InterfaceService } from './../services/interface.services';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserIdleService } from 'angular-user-idle';
import { Global } from '../app.globals';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {

  private sub: Subscription;
  private urlServer: string;

  public waiting = true;
  public senha = false;
  public error = false;

  public valorSenha: string;

  constructor(
    private _active: ActivatedRoute,
    private _router: Router,
    private _interfaceService: InterfaceService,
    private _userIdle: UserIdleService,
    private _http: HttpClient) { }

  ngOnInit() {
    this._interfaceService.getConfigUrl().subscribe(
      data => this.urlServer = data
    );

    this.sub = this._active.params.subscribe(params => {
      console.log('parametros impressão', params['id']);
      setTimeout(() => {
        this.imprimirSenha(params['id']);
      }, 100);
    });

    this._userIdle.stopWatching();
    this._userIdle.stopTimer();
  }

  imprimirSenha(idBotao: number) {

    /*const params = [
      'btn=' + idBotao,
      '&btnID=' + idBotao,
      '&tipoImpressao=' + 0
    ];*/

    // const url = 'http://localhost:8080/' + params.join('');
    // console.log('url impressão :', url);
    const infos = {
      btnId: idBotao,
      categoriaId: idBotao,
      imprimirTicket: true
    }
    this._interfaceService.imprimirTicket(infos).subscribe(
      (data: any) => {
        this.valorSenha = data.ticket;
        console.log('senha', this.valorSenha);
        if(this.valorSenha === undefined || this.valorSenha === null) {
          this.error = true;
          this.waiting = false;
          setTimeout(() => { this._router.navigate(['/interface']); }, 3000);
        } else {
          this.senha = true;
          this.waiting = false;
          setTimeout(() => { this._router.navigate(['/interface']); }, 3000);
        }
      },
      error => {
        console.log('erro no serviço');
        this.error = true;
        this.waiting = false;
        setTimeout(() => { this._router.navigate(['/interface']); }, 3000);
      }
    );
    /*this._http.post(url, '').pipe(
      //da um retry 2 vezes para o serviço
      retry(2)
    ).subscribe(
      (data: any) => {
        this.valorSenha = data.Ticket;
        console.log('senha', this.valorSenha);
        this.senha = true;
        this.waiting = false;
        setTimeout(() => {
          this._router.navigate(['/interface']);
        }, 3000);
      },
      error => {
        console.log('Tentou imprimir 2x');
        this.error = true;
        this.waiting = false;
        setTimeout(() => { this._router.navigate(['/interface']); }, 3000);
      }
    );*/
  }
}
