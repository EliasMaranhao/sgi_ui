import { Component, OnInit } from '@angular/core';
import { MembroService } from '../services/membro.service';
import { Membro } from '../cadastro/model/membro';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent implements OnInit {
  membros!: Membro[];
  formularioMembroPesquisa!: FormGroup;

  constructor(private formBuilder: FormBuilder, 
              private membroService: MembroService) { 

    console.log('CHAMOU INIT >>>>>>>>>>>>>>>>>>>>>>>>>>')
    this.buscarMembros();
  }

  ngOnInit(): void {
    this.configurarFomularioMembroPesquisa();
  }

  configurarFomularioMembroPesquisa(){
    this.formularioMembroPesquisa = this.formBuilder.group({
      nome: [null, Validators.required]
    })
  }

  buscarMembros(){
    this.membroService.buscarTodosOsMembros().subscribe({
      next: (response) => {
        this.membros = response;
      },
      error: (error) => {
        console.log('Falhou: ' + error);
      }
    })
  }
}
