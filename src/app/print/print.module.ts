import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';

import { PrintComponent } from './print.component';
import { InitModule } from '../init/init.module';

@NgModule({
  imports: [
    CommonModule,
    NgxSpinnerModule,
    InitModule,
  ],
  declarations: [
    PrintComponent
  ]
})
export class PrintModule { }
