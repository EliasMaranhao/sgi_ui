import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Cargo, Funcao } from "../model/igreja";

@Injectable({
    providedIn: 'root'
})
export class FuncaoService {
    private _URL = environment.url+'funcao';

    constructor(private http: HttpClient) { }

    buscarFuncoes(){
        return this.http.get<Funcao[]>(this._URL);
    }

    salvarCargo(cargo: Cargo){
        return this.http.post<Cargo[]>(this._URL, cargo);
    }
}