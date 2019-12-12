import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PositionAPI } from '@shared/api-end-points/position-api-endpoint';
import { ApiResponse } from '@shared/models/api-response.model';
import { Observable } from 'rxjs';
import { EmployeePosition } from './models/employee-position.model';

@Injectable({
    providedIn: 'root'
})
export class PositionService {

    constructor(private http: HttpClient) { }

    /* Public Methods */
    getAllPositions(): Observable<EmployeePosition[]> {
        return this.http.get<EmployeePosition[]>(PositionAPI.getAllPositionsUrl());
    }
}
