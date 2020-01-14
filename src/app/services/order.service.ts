import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  // baseUrl = 'http://localhost:3000/api/order';
  // baseUrl = 'http://192.168.21.27:3000/api/order';
  // baseUrl = 'http://192.168.21.28:3000/api/order';
  // baseUrl = 'http://10.83.0.86:3000/api/order';
  // baseUrl = 'http://192.168.21.7:3000/api/order';
  baseUrl = 'http://192.168.43.57:3000/api/order';

  tokenKey = localStorage.getItem('token');

  constructor(private http: HttpClient) { }

  getOrderTaken(pageNum, pageSize) {
    return this.http.get(`${this.baseUrl}/getOrderByShipperGet?`
    + `page=${pageNum}&pageSize=${pageSize}`);
  }

  getOrderTransfering(status, pageNum, pageSize) {
    return this.http.get(`${this.baseUrl}/getOrderByShipperTrans?OrderStatus=`
    + `${status}&page=${pageNum}&pageSize=${pageSize}`);
  }

  getDetailOrder(id) {
    return this.http.post(`${this.baseUrl}/detailOrder`, id);
  }

  updateOrder(id, order) {
    return this.http.put(`${this.baseUrl}/updateOrderById/${id}`, order);
  }

  getSuccessOrFailGet(pageNum, pageSize) {
    return this.http.get(`${this.baseUrl}/getSuccessOrFailGet?`
    + `page=${pageNum}&pageSize=${pageSize}`);
  }

  getSuccessOrFailTrans(pageNum, pageSize) {
    return this.http.get(`${this.baseUrl}/getSuccessOrFailTrans?`
    + `page=${pageNum}&pageSize=${pageSize}`);
  }
}
