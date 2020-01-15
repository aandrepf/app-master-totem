import { PrintComponent } from './print/print.component';
import { InterfaceComponent } from './interface/interface.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InitComponent } from './init/init.component';

const routes: Routes = [
  { path: 'init', component: InitComponent },
  { path: 'interface', component: InterfaceComponent },
  { path: 'interface/:id', component: InterfaceComponent },
  { path: 'print/botao/:id', component: PrintComponent},
  { path: '**', redirectTo: 'init'}
];

export const interfaceRouting: ModuleWithProviders = RouterModule.forRoot(routes);
