import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';

import { PrintComponent } from './print.component';

@NgModule({
  imports: [
    CommonModule,
    NgxSpinnerModule
  ],
  declarations: [
    PrintComponent
  ]
})
export class PrintModule { }
