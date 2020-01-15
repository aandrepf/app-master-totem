import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InitComponent } from './init.component';

import { InterfaceService } from '../services/interface.services';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    InitComponent
  ],
  exports: [InitComponent],
  providers: [InterfaceService]
})
export class InitModule { }
