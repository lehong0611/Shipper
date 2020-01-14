import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MomentModule } from 'ngx-moment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { ComponentsRoutingModule } from './components.router.module';
import { ModalChangePasswordComponent } from '../components/modal-change-password/modal-change-password.component';

@NgModule({
  declarations: [
    OrderListComponent,
    OrderDetailComponent,
    ModalChangePasswordComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    MomentModule,
    ComponentsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    OrderListComponent
  ]
})
export class ComponentsModule { }
