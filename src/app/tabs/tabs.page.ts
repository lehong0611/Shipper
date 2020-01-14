import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  listTab = [
    {key: 'tab1', iconName: 'ios-train', label: 'Giao hàng'},
    {key: 'tab2', iconName: 'md-train', label: 'Lấy hàng'},
    {key: 'tab3', iconName: 'md-stopwatch', label: 'Lịch sử'},
    {key: 'tab4', iconName: 'person', label: 'Tài khoản'},
  ];

  constructor(private router: Router) {}

  goToTab1(e) {
    console.log(e);
    this.router.navigate(['/tabs/tab1']);
  }

  goToTab2(e) {
    console.log(e);
    this.router.navigate(['/tabs/tab1']);
  }
}
