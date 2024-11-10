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

  getTipoDoacoes(page: number): Observable<GetTipoDoacaoResponse[]> {
    const params = new HttpParams().set('page', page.toString());
    return this.http.get<GetTipoDoacaoResponse[]>(`${this.apiUrl}/tipoDoacao`, { params });
  }

  getTipoDoacaoById(idTipoDoacao: number): Observable<GetTipoDoacaoResponse> {
    return this.http.get<GetTipoDoacaoResponse>(`${this.apiUrl}/tipoDoacao/${idTipoDoacao}`);
  }

  createTipoDoacao(tipodoacao: TipoDoacao): Observable<GetTipoDoacaoResponse> {
    return this.http.post<GetTipoDoacaoResponse>(`${this.apiUrl}/tipoDoacao`, tipodoacao);
  }

  updateTipoDoacao(idTipoDoacao: number, tipodoacao: TipoDoacao): Observable<GetTipoDoacaoResponse> {
    return this.http.put<GetTipoDoacaoResponse>(`${this.apiUrl}/tipoDoacao/${idTipoDoacao}`, tipodoacao);
  }

  deleteTipoDoacao(idTipoDoacao: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tipoDoacao/${idTipoDoacao}`);
  }
}
