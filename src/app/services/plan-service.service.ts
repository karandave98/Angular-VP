import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanServiceService {


  constructor(private http: HttpClient) { }

  getPlansList() {
    return this.http.get(`${environment.baseUrl}plans`);
  }
  getPackageList() {
    return this.http.get(`${environment.baseUrl}packages`);
  }
}
