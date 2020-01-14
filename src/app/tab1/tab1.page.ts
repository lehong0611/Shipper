import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page{
  public listOrder = [];
  isLoading: boolean;

  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((res: any) => {
      this.isLoading = true;
      this.listOrder = [];
      this.orderService.getOrderTransfering('transfering', 1, 15).subscribe((res: any) => {
        this.isLoading = false;
        console.log(res);
        this.listOrder = res.results.orders;
      });
    });
  }

  ngOnInit() {
    
  }

  // ionViewWillEnter() {
  //   this.isLoading = true;
  //   this.orderService.getOrderTransfering('transfering', 1, 15).subscribe((res: any) => {
  //     this.isLoading = false;
  //     console.log(res);
  //     this.listOrder = res.results.orders;
  //   });
  // }

}
