import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Membro, Parente } from '../cadastro/model/membro';

@Injectable({
  providedIn: 'root'
})
export class ParenteService {
  private _URL = environment.url+'parente'

  constructor(private http: HttpClient) { }

  salvarParente(parente: Parente){
    return this.http.post<Parente[]>(this._URL, parente);
  }

  buscarParentePorMembro(membro: Membro){
    return this.http.post<Parente[]>(`${this._URL}/membro`, membro);
  }
}
