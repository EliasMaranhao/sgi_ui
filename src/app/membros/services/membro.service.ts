import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Membro } from '../cadastro/model/membro';
import { DatePipe } from '@angular/common';

export class MembroFiltro {
  nome?: string;
  dataConversaoDe?: Date;
  dataConversaoAte?: Date;
  dataBatismoDe?: Date;
  dataBatismoAte?: Date
  page = 0;
  size = 10;
}

@Injectable({
  providedIn: 'root'
})
export class MembroService {
  private _URL = environment.url+'membro'

  constructor(private http: HttpClient,
              private datePipe: DatePipe
  ) { }

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

  editarMembro(id: number, membro: Membro){
    return this.http.put<Membro>(`${this._URL}/${id}`, membro);
  }

  pesquisar(filtro: MembroFiltro){
    
    let params = new HttpParams()
      .set('page', filtro.page)
      .set('size', filtro.size);

      if(filtro.nome){
        params = params.set('nome', filtro.nome);
      }

      if(filtro.dataBatismoDe){
        params = params.set('dataBatismoDe', this.datePipe.transform(filtro.dataBatismoDe, 'yyyy-HH-dd')!);
      }

      if(filtro.dataBatismoAte){
        params = params.set('dataBatismoAte', this.datePipe.transform(filtro.dataBatismoAte, 'yyyy-HH-dd')!);
      }

      if(filtro.dataConversaoDe){
        params = params.set('dataConversaoDe', this.datePipe.transform(filtro.dataConversaoDe, 'yyyy-HH-dd')!);
      }

      if(filtro.dataConversaoAte){
        params = params.set('dataConversaoAte', this.datePipe.transform(filtro.dataConversaoAte, 'yyyy-HH-dd')!);
      }

    return this.http.get(`${this._URL}/pesquisa`, { params });
  }
}
