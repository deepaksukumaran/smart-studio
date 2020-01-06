import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderAPI } from '@shared/api-end-points/order-api-endpoint';
import { ApiResponse } from '@shared/models/api-response.model';
import { Observable } from 'rxjs';
import { Order } from './models/order';
import { OrderFilterParams } from './models/order-filter-params.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  /* Public Methods */
  getAllOrders(employeeFilterParams: OrderFilterParams): Observable<ApiResponse<Order[]>> {
    return this.http.get<ApiResponse<Order[]>>(OrderAPI.getAllOrdersUrl(employeeFilterParams));
  }

  getOrder(orderId: number): Observable<Order> {
    return this.http.get<Order>(OrderAPI.getOrderUrl(orderId));
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(OrderAPI.createOrderUrl(), order);
  }

  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(OrderAPI.updateOrderUrl(order.id), order);
  }
}
