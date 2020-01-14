import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  @Input() listOrder: any[];
  @Input() isLoading: boolean;
  constructor(private router: Router) { }

  ngOnInit() {}

  goToDetailPage(order) {
    this.router.navigate(['/orderDetail'], { queryParams: { id: order.OrderId } });
  }
}
