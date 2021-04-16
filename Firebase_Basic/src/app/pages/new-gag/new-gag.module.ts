import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewGagPageRoutingModule } from './new-gag-routing.module';

import { NewGagPage } from './new-gag.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewGagPageRoutingModule
  ],
  declarations: [NewGagPage]
})
export class NewGagPageModule {}
