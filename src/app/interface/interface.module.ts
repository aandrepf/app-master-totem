import { NgxSpinnerModule } from 'ngx-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterfaceService } from './../services/interface.services';
import { InterfaceComponent } from './interface.component';

@NgModule({
  imports: [
    CommonModule,
    NgxSpinnerModule
  ],
  declarations: [
    InterfaceComponent
  ],
  providers: [InterfaceService]
})
export class InterfaceModule { }
