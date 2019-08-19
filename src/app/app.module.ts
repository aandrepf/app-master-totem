import { InterfaceService } from './services/interface.services';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// MÓDULOS
import { InterfaceModule } from './interface/interface.module';
import { PrintModule } from './print/print.module';
import { UserIdleModule } from 'angular-user-idle';
import { NgxElectronModule } from 'ngx-electron';

// SERVIÇOS

// COMPONENTES
import { AppComponent } from './app.component';

// rotas
import { interfaceRouting } from './app.routing';
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InterfaceModule,
    PrintModule,
    interfaceRouting,
    NgxElectronModule,
    // idle: 10 segundos, timeout: 15 segundos, ping: 120 segundos
    UserIdleModule.forRoot({idle: 15, timeout: 15, ping: 120})
  ],
  providers: [
    InterfaceService,
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
