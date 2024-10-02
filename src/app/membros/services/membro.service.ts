import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Membro } from '../cadastro/model/membro';

@Injectable({
  providedIn: 'root'
})
export class MembroService {
  private _URL = environment.url+'membro'

  constructor(private http: HttpClient) { }

  buscarTodosOsMembros(){
    return this.http.get<Membro[]>(this._URL);
  }

  salvarMembro(membro: Membro){
    return this.http.post<Membro>(this._URL, membro);
  }

  remover(id: number){
    return this.http.delete(`${this._URL}/${id}`);
  }

  buscarMembroPorId(id: number){
    return this.http.get<Membro>(`${this._URL}/${id}`);
  }
}
