import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewGagPage } from './new-gag.page';

const routes: Routes = [
  {
    path: '',
    component: NewGagPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewGagPageRoutingModule {}
