import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private apiUrl = environment.API_URL;;  // Altere conforme necessário

  constructor(private http: HttpClient) { }

  
  createEmpresa(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  
  updateEmpresa(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  
  getEmpresaById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  
  deleteEmpresa(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
