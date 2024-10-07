import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Contato, Membro } from '../cadastro/model/membro';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private _URL = environment.url+'contato';

  constructor(private http: HttpClient) { }

  salvarContato(contato: Contato){
    return this.http.post<Contato[]>(this._URL, contato);
  }

  remover(id: number){
    return this.http.delete(`${this._URL}/${id}`);
  }

  buscarContatoPorMembro(membro: Membro){
    return this.http.post<Contato[]>(`${this._URL}/membro`, membro);
  }

  editar(contato: Contato){
    return this.http.put<Contato[]>(`${this._URL}/${contato.id}`, contato);
  }
}
