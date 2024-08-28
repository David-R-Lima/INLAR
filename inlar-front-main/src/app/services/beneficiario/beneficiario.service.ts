import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetBeneficiarioResponse } from 'src/app/models/interfaces/beneficiario/responses/GetBeneficiarioResponse';

export interface Beneficiario {
  idBeneficiario?: number;
  nome: string;
  datanasc?: string;
  tipopessoa?: string;
  genero?: string;
  cpf?: string;
  rg?: string;
  cnpj?: string;
  contato1?: string;
  contato2?: string;
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  siglaEstado?: string;
  observacoes?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BeneficiarioService {
  private apiUrl = 'http://localhost:3256'; // URL do seu backend

  constructor(private http: HttpClient) {}

  getBeneficiarios(page: number): Observable<GetBeneficiarioResponse[]> {
    const params = new HttpParams().set('page', page.toString());
    return this.http.get<GetBeneficiarioResponse[]>(`${this.apiUrl}/beneficiario`, { params });
  }

  getBeneficiarioById(idBeneficiario: number): Observable<GetBeneficiarioResponse> {
    return this.http.get<GetBeneficiarioResponse>(`${this.apiUrl}/beneficiario/${idBeneficiario}`);
  }

  createBeneficiario(beneficiario: Beneficiario): Observable<GetBeneficiarioResponse> {
    return this.http.post<GetBeneficiarioResponse>(`${this.apiUrl}/beneficiario`, beneficiario);
  }

  updateBeneficiario(idBeneficiario: number, beneficiario: Beneficiario): Observable<GetBeneficiarioResponse> {
    return this.http.put<GetBeneficiarioResponse>(`${this.apiUrl}/beneficiario/${idBeneficiario}`, beneficiario);
  }

  deleteBeneficiario(idBeneficiario: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/beneficiario/${idBeneficiario}`);
  }
}
