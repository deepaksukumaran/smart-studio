import { API_URL_DOMAIN } from '../configs/globals';
import { EmployeeFilterParams } from 'app/feature/inner/employee/models/employee-filter-params.model';

export const EmployeeAPI = {
    createEmployeeUrl() {
        return `${API_URL_DOMAIN}/employee/create`;
    },
    updateEmployeeUrl(employeeId: number) {
        return `${API_URL_DOMAIN}/employee/${employeeId}`;
    },
    getEmployeeUrl(employeeId: number) {
        return `${API_URL_DOMAIN}/employee/id/${employeeId}`;
    },
    getAllEmployeesUrl(params: EmployeeFilterParams) {
        return `${API_URL_DOMAIN}/employee/all/page`
            + `?firstName=${params.firstName}&lastName=${params.lastName}`
            + `&page=${params.page}&size=${params.size}&sort=${params.sortBy}`;
    },
};
