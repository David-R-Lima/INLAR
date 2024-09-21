import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetDoacaoResponse } from 'src/app/models/interfaces/doacao/responses/GetDoacaoResponse';

@Injectable({
  providedIn: 'root'
})
export class DoacaoService {
  private apiUrl = 'http://localhost:3256'; 

  constructor(private http: HttpClient) {}

  // Buscar todas as doações com paginação
  getDoacoes(page: number): Observable<GetDoacaoResponse[]> {
    const params = new HttpParams().set('page', page.toString());
    return this.http.get<GetDoacaoResponse[]>(`${this.apiUrl}/doacao`, { params });
  }

  // Buscar doação por ID
  getDoacaoById(idDoacao: number): Observable<GetDoacaoResponse> {
    return this.http.get<GetDoacaoResponse>(`${this.apiUrl}/doacao/${idDoacao}`);
  }

  // Criar nova doação
  createDoacao(doacao: any): Observable<GetDoacaoResponse> {
    return this.http.post<GetDoacaoResponse>(`${this.apiUrl}/doacao`, doacao);
  }

  // Atualizar doação existente
  updateDoacao(idDoacao: number, doacao: any): Observable<GetDoacaoResponse> {
    return this.http.put<GetDoacaoResponse>(`${this.apiUrl}/doacao/${idDoacao}`, doacao);
  }

  // Deletar doação
  deleteDoacao(idDoacao: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/doacao/${idDoacao}`);
  }
}
