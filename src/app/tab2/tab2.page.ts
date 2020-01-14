import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public listOrder = [];
  isLoading: boolean;

  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((res: any) => {
      this.isLoading = true;
      this.listOrder = [];
      this.orderService.getOrderTaken(1, 15).subscribe((res: any) => {
        console.log(res);
        this.isLoading = false;
        this.listOrder = res.results.orders;
      });
    });
  }

  ionViewWillEnter() {
  }
}
