import { Component, OnInit } from '@angular/core';
import { MembroFiltro, MembroService } from '../services/membro.service';
import { Membro } from '../cadastro/model/membro';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent implements OnInit {

  totalPaginas = 0;
  totalRegistros = 0;

  primeiro = true;
  ultimo = false;

  membroFiltro = new MembroFiltro();

  membros!: Membro[];
  formularioMembroPesquisa!: FormGroup;

  constructor(private formBuilder: FormBuilder, 
              private membroService: MembroService) { 

    //this.buscarMembros();
    this.pesquisar();
  }

  ngOnInit(): void {
    this.configurarFomularioMembroPesquisa();
  }

  configurarFomularioMembroPesquisa(){
    this.formularioMembroPesquisa = this.formBuilder.group({
      nome: [null, Validators.required]
    });
  }

  buscarMembros(){
    this.membroService.buscarTodosOsMembros().subscribe({
      next: (response) => {
        this.membros = response;
      },
      error: (error) => {
        console.log('Falhou: ' + error);
      }
    });
  }

  pesquisar(){
    this.membroService.pesquisar(this.membroFiltro).subscribe({
      next: (response: any) => {
        this.membros = response.content;
        this.primeiro = response.first;
        this.ultimo = response.last;
      }, 
      error: (error) => {
        console.log('Falhou: ' + error);
      }
    });
  }

  praFrente(){
    this.membroFiltro.page = this.membroFiltro.page + 1;
    this.pesquisar();
  }

  praTras(){
    this.membroFiltro.page = this.membroFiltro.page - 1;
    this.pesquisar();
  }
}
