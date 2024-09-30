import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MembroService } from '../membro.service';
import { Denominacao, Documento, Endereco, EstadoCivil, Genero, Igreja, Membro, SituacaoMembro, TipoContato, TipoDocumento } from './model/membro';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  formularioMembro!: FormGroup;
  optionsSituacaoMembro!: string[];
  optionsGenero!: string[];
  optionsTipoContato!: string[];
  optionsTipoDocumento!: string[];
  optionsEstadoCivil!: string[];

  constructor(private formBuilder: FormBuilder, 
              private membroService: MembroService) {

                this.optionsSituacaoMembro = Object.keys(SituacaoMembro);
                this.optionsGenero = Object.keys(Genero);
                this.optionsTipoContato = Object.keys(TipoContato);
                this.optionsTipoDocumento = Object.keys(TipoDocumento);
                this.optionsEstadoCivil = Object.keys(EstadoCivil);
  }

  ngOnInit(): void {
    this.configurarFormularioMembro();

    this.formularioMembro.get('veioOutraIgreja')?.valueChanges.subscribe((value) => {
     
      if(value){
        this.formularioMembro.get('igrejaOrigem')?.enable();
      }else{
        this.formularioMembro.get('igrejaOrigem')?.disable();
      }
    });

    this.formularioMembro.get('veioOutroCampo')?.valueChanges.subscribe((value) => {
      if(value){
        this.formularioMembro.get('campoOrigem')?.enable();
      }else{
        this.formularioMembro.get('campoOrigem')?.disable();
      }
    });
  }

  configurarFormularioMembro(){
    this.formularioMembro = this.formBuilder.group({
       id: [],
       nome: [null, Validators.required],
       dataNascimento: [null, Validators.required],
       dataConversao: [null],
       dataBatismo: [null, Validators.required],
       dataRecebido: [null],
       igrejaOrigem: [null],
       estadoCivil: [null, Validators.required],
       situacaoMembro: [null, Validators.required],
       veioOutraIgreja: [null, Validators.required],
       veioOutroCampo: [null, Validators.required],
       campoOrigem: [null],
       igrejaId: [null, Validators.required],
       genero: [null, Validators.required],

       documento: this.formBuilder.group({
        tipoDocumento: [null, Validators.required],
        valor: [null, Validators.required]
       }),

       endereco: this.formBuilder.group({
        rua: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        bairro: [null, Validators.required],
        cep: [null, Validators.required],
        estado: [null, Validators.required],
        cidade: [null, Validators.required],
        pais: [null, Validators.required]
       })
    })
  }

  criarMembro(): Membro {
    let membro = new Membro();
    membro.id = this.formularioMembro.get('id')?.value;
    membro.nome = this.formularioMembro.get('nome')?.value;
    membro.dataNascimento = this.formularioMembro.get('dataNascimento')?.value;
    membro.dataConversao = this.formularioMembro.get('dataConversao')?.value;
    membro.dataBatismo = this.formularioMembro.get('dataBatismo')?.value;
    membro.dataRecebido = this.formularioMembro.get('dataRecebido')?.value;
    membro.igrejaOrigem = this.formularioMembro.get('igrejaOrigem')?.value;
    membro.estadoCivil = this.formularioMembro.get('estadoCivil')?.value;
    membro.situacaoMembro = this.formularioMembro.get('situacaoMembro')?.value;
    membro.veioOutraIgreja = this.formularioMembro.get('veioOutraIgreja')?.value;
    membro.veioOutroCampo = this.formularioMembro.get('veioOutroCampo')?.value;
    membro.campoOrigem = this.formularioMembro.get('campoOrigem')?.value;

    let igreja = new Igreja();
    igreja.id = this.formularioMembro.get('igrejaId')?.value;

    membro.igreja = igreja;
    membro.genero = this.formularioMembro.get('genero')?.value;

    let documento = new Documento();
    documento.tipoDocumento = this.formularioMembro.get('documento')?.get('tipoDocumento')?.value;
    documento.valor = this.formularioMembro.get('documento')?.get('valor')?.value;

    membro.documento = documento;

    let endereco = new Endereco();
    endereco.rua = this.formularioMembro.get('endereco')?.get('rua')?.value;
    endereco.numero = this.formularioMembro.get('endereco')?.get('numero')?.value;
    endereco.bairro = this.formularioMembro.get('endereco')?.get('bairro')?.value;
    endereco.cidade = this.formularioMembro.get('endereco')?.get('cidade')?.value;
    endereco.estado = this.formularioMembro.get('endereco')?.get('estado')?.value;
    endereco.pais = this.formularioMembro.get('endereco')?.get('pais')?.value;
    endereco.complemento = this.formularioMembro.get('endereco')?.get('complemento')?.value;
    endereco.cep = this.formularioMembro.get('endereco')?.get('cep')?.value;

    membro.endereco = endereco;

    return membro;
  }

  salvar(){
    if(this.formularioMembro.valid){
      const membro = this.criarMembro();

      this.membroService.salvarMembro(membro).subscribe({
        next: (response) => {
          alert('Membro salvo com sucesso!!');
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }

}
