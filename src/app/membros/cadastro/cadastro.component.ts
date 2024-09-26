import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  formularioMembro!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.configurarFormularioMembro();
  }

  salvar(){
    console.log(this.formularioMembro.value);
  }

  configurarFormularioMembro(){
    this.formularioMembro = this.formBuilder.group({
       codigo: [null],
       nome: [null, Validators.required],
       dataNascimento: [null, Date, Validators.required],
       dataConversao: [null, Date],
       dataBatismo: [null, Date, Validators.required],
       dataRecebido: [null, Date],
       igrejaOrigem: [],
       estadoCivil: [null, Validators.required],
       situacaoMembro: [null, Validators.required],
       veioOutraIgreja: [],
       veioOutroCampo: [],
       campoOrigem: [],
       igreja: {
        id: []
       },
       documento: this.formBuilder.group({
        tipoDocumento: [null, Validators.required],
        valor: [null, Validators.required]
       }),
       genero: [null, Validators.required],
       endereco: this.formBuilder.group({
        rua: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [],
        bairro: [null, Validators.required],
        cep: [null, Validators.required],
        estado: [null, Validators.required],
        cidade: [null, Validators.required],
        pais: [null, Validators.required]
       })
    })
  }
}
