import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentSuccessfullComponent } from './payment-successfull/payment-successfull.component';
import { PlansListComponent } from './plans-list/plans-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'plans-list',
    pathMatch: 'full'
  },
  {
    path: 'plans-list',
    component: PlansListComponent
  },
  {
    path: 'payment-successfull',
    component: PaymentSuccessfullComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
