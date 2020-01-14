import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ActivatedRoute } from '@angular/router';
// import { DatePicker } from '@ionic-native/date-picker/ngx';
// import { DatePipe } from '@angular/common';
// import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  isShowFail: boolean;
  listOrder = [];
  listOrderMore = [];
  isLoading: boolean;
  page = 1;

  constructor(private orderService: OrderService,
              private activatedRoute: ActivatedRoute) {
    this.isLoading = true;
    this.activatedRoute.queryParams.subscribe((res: any) => {
      this.getHistoryGet();
    });
  }

  ngOnInit() {
    //this.getSuccessOrder();
  }

  getHistoryGet() {
    this.isShowFail = false;
    this.listOrder = [];
    this.orderService.getSuccessOrFailGet(this.page, 15).subscribe((res: any) => {
      console.log(res.results);
      this.isLoading = false;
      this.listOrder = res.results.orders;
    });
  }

  getHistoryTrans() {
    this.isLoading = true;
    this.listOrder = [];
    this.isShowFail = true;
    this.orderService.getSuccessOrFailTrans(this.page, 15).subscribe((res: any) => {
      console.log(res.results);
      this.isLoading = false;
      this.listOrder = res.results.orders;
    });
  }

  loadMore() {
    this.isLoading = true;
    this.page += 1;
    if (this.isShowFail === true) {
      this.orderService.getSuccessOrFailTrans(this.page, 15).subscribe((res: any) => {
        console.log(res.results);
        this.isLoading = false;
        this.listOrderMore = res.results.orders;
        this.listOrder = this.listOrder.concat(this.listOrderMore);
      });
    } else {
      this.orderService.getSuccessOrFailGet(this.page, 15).subscribe((res: any) => {
        console.log(res.results);
        this.isLoading = false;
        this.listOrderMore = res.results.orders;
        this.listOrder = this.listOrder.concat(this.listOrderMore);
      });
    }
  }

}
