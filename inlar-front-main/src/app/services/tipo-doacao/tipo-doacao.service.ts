import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetTipoDoacaoResponse } from 'src/app/models/interfaces/tipo-doacao/responses/GetTipoDoacaoAction';

export interface TipoDoacao {
  idTipoDoacao?: number;
  descricao: string;
  datacad?: string;
  ativo?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TipoDoacaoService {
  private apiUrl = 'http://localhost:3256'; // URL do seu backend

  constructor(private http: HttpClient) {}

  getDoacoes(page: number): Observable<GetTipoDoacaoResponse[]> {
    const params = new HttpParams().set('page', page.toString());
    return this.http.get<GetTipoDoacaoResponse[]>(`${this.apiUrl}/tipo-doacao`, { params });
  }

  getDoacaoById(idTipoDoacao: number): Observable<GetTipoDoacaoResponse> {
    return this.http.get<GetTipoDoacaoResponse>(`${this.apiUrl}/tipo-doacao/${idTipoDoacao}`);
  }

  createDoacao(tipodoacao: TipoDoacao): Observable<GetTipoDoacaoResponse> {
    return this.http.post<GetTipoDoacaoResponse>(`${this.apiUrl}/tipo-doacao`, tipodoacao);
  }

  updateDoacao(idTipoDoacao: number, tipodoacao: TipoDoacao): Observable<GetTipoDoacaoResponse> {
    return this.http.put<GetTipoDoacaoResponse>(`${this.apiUrl}/tipo-doacao/${idTipoDoacao}`, tipodoacao);
  }

  deleteDoacao(idTipoDoacao: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tipo-doacao/${idTipoDoacao}`);
  }
}
