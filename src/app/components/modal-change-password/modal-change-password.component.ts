import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

export function comparePassword(c: AbstractControl) {
  const v = c.value;
  return (v.password === v.confirmPass) ? null : {
    passwordnotmatch: true
  };
}

@Component({
  selector: 'app-modal-change-password',
  templateUrl: './modal-change-password.component.html',
  styleUrls: ['./modal-change-password.component.scss'],
})
export class ModalChangePasswordComponent implements OnInit {

  hideCurrentPass: boolean;
  hideNewPass: boolean;
  hideConfirmPass: boolean;

  passwordForm: FormGroup;

  constructor(
    public modalController: ModalController,
    private fb: FormBuilder,
    private userService: UserService,
    private route: Router,
    public toastCtrl: ToastController) { }

  ngOnInit() {
    this.hideCurrentPass = true;
    this.hideNewPass = true;
    this.hideConfirmPass = true;

    this.passwordForm = this.fb.group({
      currentPass: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      newPass: this.fb.group({
        password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
        confirmPass: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
      },
      {validators: comparePassword})
    });
  }

  closeModal() {
    this.modalController.dismiss();
  }

  confirmChange() {
    let currentPass = this.passwordForm.value.currentPass;
    let newPass = this.passwordForm.value.newPass.password;
    this.userService.changePassword(currentPass, newPass).subscribe((res: any) => {
      if (res.status === 0) {
        this.route.navigate(['/login']);
      } else {
        this.handleMessage(res.message);
        this.closeModal();
        this.userService.logout();
        this.route.navigate(['/login']);
      }
    });
  }

  async handleMessage(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      color: 'success',
      position: 'top',
    });
    toast.present();
  }
}
