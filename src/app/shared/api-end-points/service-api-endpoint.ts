import { API_URL_DOMAIN } from '@shared/configs/globals';

export const ServiceAPI = {
    getAllServicesUrl() {
        return `${API_URL_DOMAIN}/service/service/all`;
    },
};
