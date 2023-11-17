import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Insurer, InsurerEmployee } from '@vosdellen/data-models';
import { Observable } from 'rxjs';
import { BaseService } from '@nxt/generic-store';

const API_URL = `${environment.apiUrl}/employees`;

@Injectable({
  providedIn: 'root',
})
export class EmployeesService implements BaseService<InsurerEmployee> {
  constructor(private _http: HttpClient) {}

  public getAll(): Observable<InsurerEmployee[]> {
    console.log('getAll()');
    return this._http.get<InsurerEmployee[]>(API_URL);
  }

  public getEntity(id: number): Observable<InsurerEmployee> {
    console.log('id', id);
    return this._http.get<InsurerEmployee>(`${API_URL}/${id}`);
  }

  public addEntity(employeeData: InsurerEmployee): Observable<InsurerEmployee> {
    return this._http.post<InsurerEmployee>(API_URL, employeeData);
  }

  public updateEntity(
    id: number,
    employeeData: Partial<InsurerEmployee>
  ): Observable<InsurerEmployee> {
    return this._http.patch<InsurerEmployee>(`${API_URL}/${id}`, employeeData);
  }

  public deleteEntity(employeeData: InsurerEmployee): Observable<InsurerEmployee> {
    return this._http.delete<InsurerEmployee>(
      `${API_URL}/${employeeData.id}`
    );
  }
}