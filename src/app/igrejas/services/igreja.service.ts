import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Igreja } from '../model/igreja';

@Injectable({
  providedIn: 'root'
})
export class IgrejaService {
  private _URL = environment.url+'igreja';

  constructor(private http: HttpClient) { }

  buscarIgrejas(){
    return this.http.get<Igreja[]>(this._URL);
  }
}
