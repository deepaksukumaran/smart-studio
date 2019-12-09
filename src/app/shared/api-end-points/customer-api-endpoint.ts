import { API_URL_DOMAIN } from '../configs/globals';
import { CustomerFilterParams } from 'app/feature/inner/customer/models/customer-filter-params.model';

export const CustomerAPI = {
    createCustomerUrl() {
        return `${API_URL_DOMAIN}/customer/create`;
    },
    updateCustomerUrl(customerId: string) {
        return `${API_URL_DOMAIN}/customer/${customerId}`;
    },
    getCustomerUrl(customerId: number) {
        return `${API_URL_DOMAIN}/customer/id/${customerId}`;
    },
    getAllCustomersUrl(params: CustomerFilterParams) {
        return `http://3.134.113.107:8091/api/v1/order-details/order/customer/all`;
    },
};
