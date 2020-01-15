import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Global } from './../app.globals';
import { InterfaceEmissor, Pagina } from '../models/interface.model';
import { Urls } from './../models/configs.model';
import { Router } from '@angular/router';
import { ElectronService } from 'ngx-electron';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

class IpcCom {
  endpoint: string;
  ssl: boolean;
  debug: string;
}

@Injectable()
export class InterfaceService {
  public interfacePagina: number;
  public idVolta = [];
  public retorno: IpcCom = new IpcCom();
  public endpoint: string;
  public protocol: string;

  constructor(private _http: HttpClient, private router: Router, private _electron: ElectronService) {
    console.log('rodando electron?', this._electron.isElectronApp);
    if (this._electron.isElectronApp) {
      this.retorno = this._electron.ipcRenderer.sendSync('com', { 'evt': 'startup' });
      this.endpoint = this.retorno.endpoint;
      this.protocol = this.retorno.ssl ? 'https' : 'http';
      console.log('retorno electron', this.retorno);
    } else {
      this.endpoint = 'localhost';
      this.protocol = 'http';
    }
  }

  getInterfacePage(page: number) {
    return page;
  }

  getInterfaceContent(): Observable<Pagina[]> {
    const url = `${this.protocol}://${this.endpoint}:8080/utils/buscaJsonInterface`;
    return this._http.get<InterfaceEmissor>(url).pipe(
      map(tela => {
        return tela.interfaceEmissorPagina;
      })
    );
  }

  imprimirTicket(item: Object) {
    const url = `${this.protocol}://${this.endpoint}:8080/atendimento/novaSenha`;
    const body = JSON.stringify(item);
    return this._http.post(url, body, httpOptions);
  }

  getConfigUrl(): Observable<any> {
    return this._http.get(`${Global.CONFIG_URL}`).pipe(
      map((data: Urls) => {
        return data.UrlServer;
      })
    );
  }

  disableMouseSecondClick() {
    window.oncontextmenu = function(event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    };
  }
}
