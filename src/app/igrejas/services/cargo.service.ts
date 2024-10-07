import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Cargo } from "../model/igreja";
import { Membro } from "src/app/membros/cadastro/model/membro";

@Injectable({
    providedIn: 'root'
})
export class CargoService {
    private _URL = environment.url+'cargo';

    constructor(private http: HttpClient){

    }

    salvarCargo(cargo: Cargo){
        return this.http.post<Cargo[]>(this._URL, cargo);
    }

    buscarCargoPorMembro(membro: Membro){
        return this.http.post<Cargo[]>(`${this._URL}/membro`, membro);
    }
}