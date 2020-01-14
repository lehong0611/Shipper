import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalChangePasswordComponent } from '../components/modal-change-password/modal-change-password.component';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  userData: any;
  errorMessage: string;

  constructor(
    private userService: UserService,
    private route: Router,
    public modalController: ModalController) { }

  ngOnInit() {
    this.userService.getDetailAccount().subscribe((res: any) => {
      this.userData = res.results;
    },
      (err) => {
        console.log(err);
        // this.errorMessage = err.
      });
  }

  logOut() {
    this.userService.logout();
    this.route.navigate(['/login']);
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalChangePasswordComponent,
      componentProps: {
        paramID: 123,
        paramTitle: "Test Title"
      },
      cssClass: 'my-custom-modal-css'
    });

    return await modal.present();
  }

  // closeModal() {
  //   this.modalController.dismiss();
  // }
}
