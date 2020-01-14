import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(
    private userService: UserService,
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    public toastController: ToastController) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      Email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      Password: ['', Validators.compose([
        Validators.required, Validators.minLength(8)
      ])],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      let message = 'Hoàn thành đúng thông tin để đăng nhập';
      this.handleMessage(message);
      return;
    } else {
      this.userService.login(this.loginForm.value.Email, this.loginForm.value.Password).subscribe(
        data => {
          console.log(data);
          if (data.status === 1) {
            console.log('Logged in');
            console.log(data);
            this.navCtrl.navigateRoot('/tabs/tab1');
          } else {
            if ( Array.isArray(data.message)) {
              data.message.forEach(item => {
                this.handleMessage(item.msg);
              });
            } else {
              this.handleMessage(data.message);
            }
            return;
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  async handleMessage(err) {
    const toast = await this.toastController.create({
      message: err,
      duration: 3000,
      color: 'warning',
      position: 'top',
    });
    toast.present();
  }
}
