import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MembroService } from '../services/membro.service';
import { Contato, Documento, EstadoCivil, Genero, Membro, Parente, SituacaoMembro, TipoContato, TipoDocumento, TipoParentesco } from './model/membro';
import { ContatoService } from '../services/contato.service';
import { ActivatedRoute } from '@angular/router';
import { ParenteService } from '../services/parente.service';
import { Cargo, Funcao, Igreja } from 'src/app/igrejas/model/igreja';
import { Endereco } from 'src/app/model/core';
import { IgrejaService } from 'src/app/igrejas/services/igreja.service';
import { FuncaoService } from 'src/app/igrejas/services/funcao.service';
import { CargoService } from 'src/app/igrejas/services/cargo.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  formularioMembro!: FormGroup;
  formularioContato!: FormGroup;
  formularioParente!: FormGroup;
  formularioCargo!: FormGroup;

  optionsSituacaoMembro!: string[];
  optionsGenero!: string[];
  optionsTipoContato!: string[];
  optionsTipoDocumento!: string[];
  optionsEstadoCivil!: string[];
  optionsTipoParentesco!: string[];

  membro?: Membro;
  contatos?: Contato[];
  parentes?: Parente[];
  igrejas?: Igreja[];
  funcoes?: Funcao[];
  cargos?: Cargo[];

  contatoEdit = false;
  cargoEdit = false;


  constructor(private formBuilder: FormBuilder, 
              private membroService: MembroService,
              private contatoService: ContatoService,
              private rotas: ActivatedRoute,
              private parenteService: ParenteService,
              private igrejaService: IgrejaService,
              private funcaoService: FuncaoService,
              private cargoService: CargoService) {

      this.optionsSituacaoMembro = Object.keys(SituacaoMembro);
      this.optionsGenero = Object.keys(Genero);
      this.optionsTipoContato = Object.keys(TipoContato);
      this.optionsTipoDocumento = Object.keys(TipoDocumento);
      this.optionsEstadoCivil = Object.keys(EstadoCivil);
      this.optionsTipoParentesco = Object.keys(TipoParentesco);

      this.buscarIgrejas();
      this.buscarFuncoes();
  }

  ngOnInit(): void {
    this.configurarFormularioMembro();
    this.configurarFormularioContato();
    this.configurarFormularioParente();
    this.configurarFormularioCargo();

    //se veio do formulario de pesquisa
    const id = this.rotas.snapshot.params['id'];
    if(id != undefined){
      this.buscarMembroPorId(id);
    }

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

  buscarIgrejas(){
    this.igrejaService.buscarIgrejas().subscribe({
      next: (response) => {
        this.igrejas = response;
      },
      error: (error) => {
        console.log('Erro ao carregar igrejas: ' + error);
      }
    });
  }

  buscarFuncoes(){
    this.funcaoService.buscarFuncoes().subscribe({
      next: (response) => {
        this.funcoes = response;
      },
      error: (error) => {
        console.log('Erro ao carregar funcoes: ' + error);
      }
    });
  }

  configurarFormularioCargo(){
    this.formularioCargo = this.formBuilder.group({
      id: [],
      dataPosse:[null, Validators.required],
      dataDestituicao: [null],
      funcao: [null, Validators.required]
    });
  }

  configurarFormularioParente(){
    this.formularioParente = this.formBuilder.group({
      id: [],
      parentesco: [null, Validators.required],
      valorParentesco: [null, Validators.required]
    });
  }

  configurarFormularioContato(){
    this.formularioContato = this.formBuilder.group({
      id: [],
      tipoContato: [null, Validators.required],
      valor: [null, Validators.required]
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
       genero: [null, Validators.required],

       igreja: this.formBuilder.group({
        id: [null, Validators.required]
       }),

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

  criarCargo(): Cargo{
    let cargo = new Cargo();
    
    cargo.id = {
      'funcaoId': this.formularioCargo.get('funcao')?.value,
      'membroId' : this.membro?.id
    };

    cargo.dataPosse = this.formularioCargo.get('dataPosse')?.value;
    cargo.dataDestituicao = this.formularioCargo.get('dataDestituicao')?.value;

    let membro = new Membro();
    membro.id = this.membro?.id;

    let funcao = new Funcao();
    funcao.id = this.formularioCargo.get('funcao')?.value;

    cargo.funcao = funcao;
    cargo.membro = membro;
    return cargo;
  }

  criarParente(): Parente{
    let parente = new Parente();
    parente.nome = this.formularioParente.get('valorParentesco')?.value;
    parente.parentesco = this.formularioParente.get('parentesco')?.value;

    let membro = new Membro();
    membro.id = this.membro?.id;

    parente.membro = membro;

    return parente;
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
    igreja.id = this.formularioMembro.get('igreja')?.get('id')?.value;

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

  criarContato(): Contato{
    let contato = new Contato();

    contato.id = this.formularioContato.get('id')?.value;
    contato.tipoContato = this.formularioContato.get('tipoContato')?.value;
    contato.valor = this.formularioContato.get('valor')?.value;

    let membro = new Membro();
    membro.id = this.membro!.id;

    contato.membro = membro!;
    return contato;
  }

  salvar(){
    if(this.formularioMembro.valid){
      const membro = this.criarMembro();
      if(membro.id){
        this.membroService.editarMembro(membro.id, membro).subscribe({
          next: (response) => {
            this.membro = response;
            alert('Membro atualizado com sucesso!!');
          },

          error: (error) =>{
            console.log('Nao possivel atualizar o registro: ' + error);
          }
        });
      }else{
        this.membroService.salvarMembro(membro).subscribe({
          next: (response) => {
            this.membro = response;
            alert('Membro salvo com sucesso!!');
          },
          error: (error) => {
            console.log('Nao possivel salvar o registro: ' + error);
          }
        });
      }
    }
  }

  salvarCargo(){
    if(this.formularioCargo.valid){
      const cargo = this.criarCargo();
      if(this.cargoEdit){
        this.cargoService.editarCargo(cargo).subscribe({
          next: (response) => {
            alert('Cargo editado com sucesso');
            this.buscarCargosPorMembro(cargo.membro);
          }
        });
      }else{
        this.cargoService.salvarCargo(cargo).subscribe({
          next: (response) => {
            this.cargos = response;
            alert('Posse realizada com sucesso');
            this.buscarCargosPorMembro(cargo.membro);
          },
  
          error: (error) => {
            console.log('Erro ao empossar membro em novo cargo: ' + error);
          }
        });
      }

      this.formularioCargo.reset();
    }
  }

  salvarContato(){
    if(this.formularioContato.valid){
      const contato = this.criarContato();

      if(this.contatoEdit){
        this.contatoService.editar(contato).subscribe({
          next: (response)=> {
            alert('Contato editado com sucesso!!');
            this.buscarContatosPorMembro(contato.membro);
          },

          error: (error)=> {
            console.log(`Falha ao editar contato: ${error}`)
          }
        });

        this.contatoEdit = false;
      }else{
        this.contatoService.salvarContato(contato).subscribe({
          next: (response) =>{
            this.contatos = response;
            alert('Contato salvo com sucesso!!');
          },
  
          error: (error) => {
            console.log(`Falha ao cadastrar contato: ${error}`)
          }
        });
      }
      this.formularioContato.reset();
    }
  }

  salvarParente(){
    if(this.formularioParente.valid){
      const parente = this.criarParente();
      this.parenteService.salvarParente(parente).subscribe({
        next: (response) => {
          this.parentes = response;
          alert('Parente salvo com sucesso !');
        },
        error: (error) => {
          console.log('Erro ao tentar inserir parente: ' + error);
        }
      })
    }
  }

  editarContato(contato: Contato){
    this.formularioContato.get('id')?.setValue(contato.id);
    this.formularioContato.get('tipoContato')?.setValue(contato.tipoContato);
    this.formularioContato.get('valor')?.setValue(contato.valor);
    this.contatoEdit = true;
  }

  editarCargo(cargo: Cargo){
    this.formularioCargo.get('id')?.setValue(cargo.id);
    this.formularioCargo.get('dataPosse')?.setValue(cargo.dataPosse);
    this.formularioCargo.get('dataDestituicao')?.setValue(cargo.dataDestituicao);
    this.formularioCargo.get('funcao')?.setValue(cargo.funcao.id);
    this.cargoEdit = true;
  }

  buscarMembroPorId(id: number){
    this.membroService.buscarMembroPorId(id).subscribe({
      next: (response) => {
        this.membro = response;
        this.loadMembro(this.membro);

        let membro = new Membro();
        membro.id = this.membro.id;

        this.buscarContatosPorMembro(membro);
        this.buscarParentesPorMembro(membro);
        this.buscarCargosPorMembro(membro);
      },
      error: (error) => {
        console.log(`Erro ao tentar carregar membro: ${error}`);
      }
    })
  }

  buscarContatosPorMembro(membro: Membro){
    this.contatoService.buscarContatoPorMembro(membro).subscribe({
      next: (response) => {
        this.contatos = response;
      },

      error: (error) => {
        console.log('Erro ao buscar contatos: ' + error)
      }
    });
  }

  buscarParentesPorMembro(membro: Membro){
    this.parenteService.buscarParentePorMembro(membro).subscribe({
      next: (response) => {
        this.parentes = response;
      },

      error: (error) => {
        console.log('Erro ao buscar contatos: ' + error);
      }
    });
  }

  buscarCargosPorMembro(membro: Membro){
    this.cargoService.buscarCargoPorMembro(membro).subscribe({
      next: (response) => {
        this.cargos = response;
      },

      error: (error) => {
        console.log('Erro ao buscar cargos: ' + error);
      }
    });
  }

  deletarContato(id: number){
    this.contatoService.remover(id).subscribe({
      next: (response) => {
        alert("Contato removido");

        let membro = new Membro();
        membro.id = this.membro?.id;

        this.buscarContatosPorMembro(membro);
      },
      error: (error) => {
        console.log(`Erro ao tentar remover contato: ${error}`);
      }
    });
  }

  deletarCargo(cargo: Cargo){
    this.cargoService.deletarCargo(cargo).subscribe({
      next: (response) => {
        alert("Cargo removido");

        let membro = new Membro();
        membro.id = this.membro?.id;

        this.buscarCargosPorMembro(membro);
      },
      error: (error) => {
        console.log(`Erro ao tentar remover cargo: ${error}`);
      }
    });
  }

  loadMembro(membro: Membro){
    try{
      this.formularioMembro.get('id')?.setValue(membro.id);
      this.formularioMembro.get('nome')?.setValue(membro.nome);
      this.formularioMembro.get('dataNascimento')?.setValue(membro.dataNascimento);
      this.formularioMembro.get('dataConversao')?.setValue(membro.dataConversao);
      this.formularioMembro.get('dataBatismo')?.setValue(membro.dataBatismo);
      this.formularioMembro.get('dataRecebido')?.setValue(membro.dataRecebido);
      this.formularioMembro.get('igrejaOrigem')?.setValue(membro.igrejaOrigem);
      this.formularioMembro.get('estadoCivil')?.setValue(membro.estadoCivil);
      this.formularioMembro.get('situacaoMembro')?.setValue(membro.situacaoMembro);
      this.formularioMembro.get('veioOutraIgreja')?.setValue(membro.veioOutraIgreja);
      this.formularioMembro.get('veioOutroCampo')?.setValue(membro.veioOutroCampo);
      this.formularioMembro.get('campoOrigem')?.setValue(membro.campoOrigem);
      this.formularioMembro.get('igreja')?.get('id')?.setValue(membro.igreja);
      this.formularioMembro.get('genero')?.setValue(membro.genero);
      this.formularioMembro.get('documento')?.setValue(membro.documento)
      this.formularioMembro.get('endereco')?.setValue(membro.endereco);
    }
    catch(error){
      console.log(error);
    }
  }
}
