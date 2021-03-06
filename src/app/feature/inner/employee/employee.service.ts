import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeAPI } from '@shared/api-end-points/employee-api-endpoint';
import { ApiResponse } from '@shared/models/api-response.model';
import { EmployeeFilterParams } from 'app/feature/inner/employee/models/employee-filter-params.model';
import { Employee } from 'app/feature/inner/employee/models/employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  /* Public Methods */
  getAllEmployees(employeeFilterParams: EmployeeFilterParams): Observable<ApiResponse<Employee[]>> {
    return this.http.get<ApiResponse<Employee[]>>(EmployeeAPI.getAllEmployeesUrl(employeeFilterParams));
  }

  getEmployee(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(EmployeeAPI.getEmployeeUrl(employeeId));
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(EmployeeAPI.createEmployeeUrl(), employee);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(EmployeeAPI.updateEmployeeUrl(employee.id), employee);
  }
}
