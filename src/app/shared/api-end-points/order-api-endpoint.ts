import { OrderFilterParams } from 'app/feature/inner/order/models/order-filter-params.model';
import { API_URL_DOMAIN } from '../configs/globals';

export const OrderAPI = {
    createOrderUrl() {
        return `${API_URL_DOMAIN}/order-details/order/order/create`;
    },
    updateOrderUrl(orderId: number) {
        return `${API_URL_DOMAIN}/order-details/order/order/update/${orderId}`;
    },
    getOrderUrl(orderId: number) {
        return `${API_URL_DOMAIN}/order-details/order/order/${orderId}`;
    },
    getAllOrdersUrl(params: OrderFilterParams) {
        return `${API_URL_DOMAIN}/order-details/order/order/pages`
            + `?custname=${params.custName}&email=${params.email}&phone=${params.phone}`
            + `&present=${params.present}&priority=${params.priority}&status=${params.status}`
            + `&page=${params.page}&size=${params.size}&sort=${params.sortBy}&direction=${params.sortDirection}`;
    },
};
