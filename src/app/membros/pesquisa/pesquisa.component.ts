import { Component, OnInit } from '@angular/core';
import { MembroService } from '../membro.service';
import { Membro } from '../cadastro/model/membro';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent implements OnInit {
  membros!: Membro[];

  constructor(private membroService: MembroService) { 
    console.log('CHAMOU INIT >>>>>>>>>>>>>>>>>>>>>>>>>>')
    this.buscarMembros();
  }

  ngOnInit(): void {
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
