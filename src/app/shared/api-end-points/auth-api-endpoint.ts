import { API_URL_DOMAIN } from '@shared/configs/globals';

export const AuthAPI = {
    validateUserUrl() {
        return `http://18.218.200.185:8091/authenticate`;
    },

    getEmployeeAuthoritiesUrl() {
        return `${API_URL_DOMAIN}/org/employee/authorities`;
    },
};
