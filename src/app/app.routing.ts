import { PrintComponent } from './print/print.component';
import { InterfaceComponent } from './interface/interface.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'interface', component: InterfaceComponent },
  { path: 'interface/:id', component: InterfaceComponent },
  { path: 'print/botao/:id', component: PrintComponent},
  { path: '**', redirectTo: 'interface'}

];

export const interfaceRouting: ModuleWithProviders = RouterModule.forRoot(routes);
