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
        return `${API_URL_DOMAIN}/order-details/order/customer/pages`
            + `?name=${params.name}&mobile=${params.mobile}`
            + `&page=${params.page}&size=${params.size}&sort=${params.sortBy}&direction=${params.sortDirection}`;
    },
};
