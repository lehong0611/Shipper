import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { ModalChangePasswordComponent } from '../components/modal-change-password/modal-change-password.component';

import { IonicModule } from '@ionic/angular';

import { Tab4Page } from './tab4.page';

const routes: Routes = [
  {
    path: '',
    component: Tab4Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [Tab4Page],
  entryComponents: [ModalChangePasswordComponent]
})
export class Tab4PageModule {}
