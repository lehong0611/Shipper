import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoggedIn = false;
  token: any;

  // baseUrl = 'http://localhost:3000/api';
  // baseUrl = 'http://192.168.21.27:3000/api';
  // baseUrl = 'http://192.168.21.28:3000/api';
  // baseUrl = 'http://10.83.0.86:3000/api';
  baseUrl = 'http://192.168.43.57:3000/api';

  constructor(private http: HttpClient) { }

  login(email, password) {
    return this.http.post(`${this.baseUrl}/login`, { Email: email, Password: password })
      .pipe(
        tap((res: any) => {
          if (res.status === 0) {
            return res;
          } else {
            localStorage.setItem('token', res.results.token);
            this.token = res.results.token;
            this.isLoggedIn = true;
            return true;
          }
        })
      );
  }

  logout() {
    // const headers = new HttpHeaders({
    //   Authorization: this.token.token_type + ' ' + this.token.access_token
    // });
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    delete this.token;
  }

  getToken() {
    // return this.storage.getItem('token').then(
    //   data => {
    //     this.token = data;
    //     if (this.token != null) {
    //       this.isLoggedIn = true;
    //     } else {
    //       this.isLoggedIn = false;
    //     }
    //   },
    //   error => {
    //     this.token = null;
    //     this.isLoggedIn = false;
    //   }
    // );
    this.token = localStorage.getItem('token');
    if (this.token != null) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  getDetailAccount() {
    return this.http.get(`${this.baseUrl}/detailEmployee`);
  }

  changePassword(currentPass, newPass) {
    return this.http.post(`${this.baseUrl}/changePassword`, { currentPass, newPass });
  }

}
