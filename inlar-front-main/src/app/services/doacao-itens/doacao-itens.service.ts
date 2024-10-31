import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetDoacaoItensResponse } from 'src/app/models/interfaces/doacao-itens/responses/GetDoacaoItensAction';

export interface DoacaoItens {
  idItemDoacao?: number;
  idDoacao?: number;
  idTipoDoacao?: number;
  numitem?: number;
  descricao?: string;
  qtde?: number;
  valormonetario?: string;
  datacad?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DoacaoItensService {
  private apiUrl = 'http://localhost:3256'; // URL do seu backend

  constructor(private http: HttpClient) {}

  getDoacoes(page: number): Observable<GetDoacaoItensResponse[]> {
    const params = new HttpParams().set('page', page.toString());
    return this.http.get<GetDoacaoItensResponse[]>(`${this.apiUrl}/doacao-itens`, { params });
  }

  getDoacaoById(idItemDoacao: number): Observable<GetDoacaoItensResponse> {
    return this.http.get<GetDoacaoItensResponse>(`${this.apiUrl}/doacao-itens/${idItemDoacao}`);
  }

  createDoacao(doacaoitens: DoacaoItens): Observable<GetDoacaoItensResponse> {
    return this.http.post<GetDoacaoItensResponse>(`${this.apiUrl}/doacao-itens`, doacaoitens);
  }

  updateDoacao(idItemDoacao: number, doacaoitens: DoacaoItens): Observable<GetDoacaoItensResponse> {
    return this.http.put<GetDoacaoItensResponse>(`${this.apiUrl}/doacao-itens/${idItemDoacao}`, doacaoitens);
  }

  deleteDoacao(idItemDoacao: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/doacao-itens/${idItemDoacao}`);
  }
}
