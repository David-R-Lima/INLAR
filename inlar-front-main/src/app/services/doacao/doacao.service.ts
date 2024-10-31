import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetDoacaoResponse } from 'src/app/models/interfaces/doacao/responses/GetDoacaoAction'; 

export interface Doacao {
  idDoacao?: number;
  idDoador?: number;
  idBeneficiario?: number;
  descricao: string;
  datacad?: string;
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  siglaEstado?: string;
  ativo?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DoacaoService {
  private apiUrl = 'http://localhost:3256'; // URL do seu backend

  constructor(private http: HttpClient) {}

  getDoacoes(page: number): Observable<GetDoacaoResponse[]> {
    const params = new HttpParams().set('page', page.toString());
    return this.http.get<GetDoacaoResponse[]>(`${this.apiUrl}/doacao`, { params });
  }

  getDoacaoById(idDoacao: number): Observable<GetDoacaoResponse> {
    return this.http.get<GetDoacaoResponse>(`${this.apiUrl}/doacao/${idDoacao}`);
  }

  createDoacao(doacao: Doacao): Observable<GetDoacaoResponse> {
    return this.http.post<GetDoacaoResponse>(`${this.apiUrl}/doacao`, doacao);
  }

  updateDoacao(idDoacao: number, doacao: Doacao): Observable<GetDoacaoResponse> {
    return this.http.put<GetDoacaoResponse>(`${this.apiUrl}/doacao/${idDoacao}`, doacao);
  }

  deleteDoacao(idDoacao: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/doacao/${idDoacao}`);
  }
}
