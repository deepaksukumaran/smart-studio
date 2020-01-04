import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PositionAPI } from '@shared/api-end-points/position-api-endpoint';
import { ApiResponse } from '@shared/models/api-response.model';
import { Observable, of } from 'rxjs';
import { EmployeePosition } from './models/employee-position.model';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PositionService {

    private positions: EmployeePosition[];

    constructor(private http: HttpClient) { }

    /* Public Methods */
    getAllPositions(): Observable<EmployeePosition[]> {
        return this.positions
            ? of(this.positions)
            : this.http.get<EmployeePosition[]>(PositionAPI.getAllPositionsUrl()).pipe(
                tap((data) => { this.positions = data; })
            );
    }
}
