import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {

  public order: any;
  id: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private router: Router) { }

  ngOnInit() {
    this.getInforOrder();
  }

  getInforOrder() {
    let params = {
      OrderId: this.activatedRoute.snapshot.queryParams.id
    };
    this.orderService.getDetailOrder(params).subscribe((res: any) => {
      this.order = res.results;
    });
  }

  setSuccess() {
    const param = this.order;
    if (param.AcceptAdminId && param.AcceptAdminId.AdminId && param.AcceptAdminId.acceptTime) {
      param.AdminId = param.AcceptAdminId.AdminId;
      param.AcceptTime = param.AcceptAdminId.acceptTime;
    }
    if (param.Taken && param.Taken.date && param.Taken.isSuccess) {
      param.isTakeSuccess = param.Taken.isSuccess;
      param.TakeTime = param.Taken.date;
    }
    param.OrderStatusName = 'success';
    param.OrderStatusTime = new Date();
    this.orderService.updateOrder(this.order.OrderId, param).subscribe((res: any) => {
      this.router.navigate(['/tabs/tab1']);
    });
  }

  setFail() {
    const param = this.order;
    if (param.AcceptAdminId && param.AcceptAdminId.AdminId && param.AcceptAdminId.acceptTime) {
      param.AdminId = param.AcceptAdminId.AdminId;
      param.AcceptTime = param.AcceptAdminId.acceptTime;
    }
    if (param.Taken && param.Taken.date && param.Taken.isSuccess) {
      param.isTakeSuccess = param.Taken.isSuccess;
      param.TakeTime = param.Taken.date;
    }
    param.OrderStatusName = 'failed';
    param.OrderStatusTime = new Date();
    this.orderService.updateOrder(this.order.OrderId, param).subscribe((res: any) => {
      this.router.navigate(['/tabs/tab1']);
    });
  }

  getFromCusSuccess() {
    const param = this.order;
    if (param.AcceptAdminId && param.AcceptAdminId.AdminId && param.AcceptAdminId.acceptTime) {
      param.AdminId = param.AcceptAdminId.AdminId;
      param.AcceptTime = param.AcceptAdminId.acceptTime;
    }
    param.OrderStatusName = 'taken';
    param.isTakeSuccess = true;
    param.OrderStatusTime = param.TakeTime = new Date();
    console.log(param);
    this.orderService.updateOrder(this.order.OrderId, param).subscribe((res: any) => {
      this.getInforOrder();
    });
  }

  getFailFromCus() {
    const param = this.order;
    if (param.AcceptAdminId && param.AcceptAdminId.AdminId && param.AcceptAdminId.acceptTime) {
      param.AdminId = param.AcceptAdminId.AdminId;
      param.AcceptTime = param.AcceptAdminId.acceptTime;
    }
    param.OrderStatusName = 'miss-taken';
    param.OrderStatusTime = param.TakeTime = new Date();
    param.isTakeSuccess = false;
    this.orderService.updateOrder(this.order.OrderId, param).subscribe((res: any) => {
      this.router.navigate(['/tabs/tab2']);
    });
  }

  availableIn() {
    const param = this.order;
    if (param.AcceptAdminId && param.AcceptAdminId.AdminId && param.AcceptAdminId.acceptTime) {
      param.AdminId = param.AcceptAdminId.AdminId;
      param.AcceptTime = param.AcceptAdminId.acceptTime;
    }
    param.OrderStatusName = 'wait-trans';
    param.OrderStatusTime = new Date();
    if (param.Taken && param.Taken.date && param.Taken.isSuccess) {
      param.isTakeSuccess = param.Taken.isSuccess;
      param.TakeTime = param.Taken.date;
    }
    this.orderService.updateOrder(this.order.OrderId, param).subscribe(() => {
      this.router.navigate(['/tabs/tab2']);
      // this.orderService.getDetailOrder(this.order.OrderId).subscribe((res: any) => {
      //   this.order = res.results;
      // });
    });
  }
}
