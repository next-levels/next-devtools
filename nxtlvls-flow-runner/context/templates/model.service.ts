import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import {
  AgenciesPaginated,
  Agency,
  FilterOptions,
} from '@vosdellen/data-models';
import { Observable } from 'rxjs';
import { BaseService } from '@nxt/generic-store';

const API_URL = `${environment.apiUrl}/agency`;

@Injectable({
  providedIn: 'root',
})
export class AgenciesService implements BaseService<Agency> {
  constructor(private _http: HttpClient) {}

  public getAll(): Observable<Agency[]> {
    console.log('getAll()');
    return this._http.get<Agency[]>(API_URL);
  }
  public findByFilter(filter: FilterOptions): Observable<AgenciesPaginated> {
    console.log('Inside findByFilter:', filter);
    return this._http.get<AgenciesPaginated>(`${API_URL}/filter`, {
      params: {
        ...filter,
      },
    });
  }
  public addEntity(agencyData: Agency): Observable<Agency> {
    return this._http.post<Agency>(API_URL, agencyData);
  }

  public getEntity(id: number): Observable<Agency> {
    console.log('id', id);
    return this._http.get<Agency>(`${API_URL}/${id}`);
  }

  public updateEntity(
    id: number,
    agencyData: Partial<Agency>
  ): Observable<Agency> {
    return this._http.patch<Agency>(`${API_URL}/${id}`, agencyData);
  }

  public deleteEntity(agencyData: Agency): Observable<Agency> {
    return this._http.get<Agency>(API_URL);
  }

  public exportAgencies(agencies: Agency[]): Observable<Agency[]> {
    return this._http.get<Agency[]>(API_URL);
  }
}
