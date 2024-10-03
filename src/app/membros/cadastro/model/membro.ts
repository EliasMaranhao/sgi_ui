import { Igreja } from "src/app/igrejas/model/igreja";
import { Endereco } from "src/app/model/core";

export class Membro {
    id?: number;
    nome!: string;
    dataNascimento!: Date;
    dataConversao?: Date;
    dataBatismo!: Date;
    dataRecebido?: Date;
    igrejaOrigem?: string;
    estadoCivil!: EstadoCivil;
    situacaoMembro!: SituacaoMembro;
    veioOutraIgreja!: boolean;
    veioOutroCampo!: boolean;
    campoOrigem?: string;
    igreja!: Igreja;
    documento!: Documento;
    genero!: Genero;
    endereco!: Endereco;
    contatos?: Contato[];
}

export enum EstadoCivil {
    SOLTEIRO = 'Solteiro',
    CASADO = 'Casado'
}

export enum SituacaoMembro {
    EM_COMUNHAO = 'Em Comunhão',
    FORA_DA_COMUNHAO = 'Fora da Comunhão',
    PEDIU_CARTA = 'Pediu carta',
    SUSPENSO = 'Suspenso'
}

export enum TipoDocumento {
    CPF = 'Cpf',
    IDENTIDADE = 'Identidade',
    CARTEIRA_DE_MOTORISTA = 'Carteira de motorista',
    PASSAPORTE = 'Passaporte'
}

export enum TipoContato {
    TELEFONE = 'Telefone',
    EMAIL = 'Email'
}

export enum Genero {
    MASCULINO = 'Masculino',
    FEMININO = 'Feminino'
}

export enum TipoParentesco {
    IRMAO = 'Irmão',
    IRMA = 'Irmã',
    PRIMO = 'Primo',
    PRIMA = 'Prima',
    PAI = 'Pai',
    MAE = 'Mãe',
    AVO = 'Avós',
    TIO = 'Tio',
    TIA = 'Tia',
    PADRASTO = 'Padastro',
    MADRASTA = 'Madastra'
}

export class Contato {
    id!: number;
    tipoContato!: TipoContato;
    valor!: string;
    membro!: Membro;
}

export class Parente {
    id?: number;
    nome!: string;
    parentesco!: TipoParentesco;
    membro!: Membro;
}

export class Documento {
    tipoDocumento!: TipoDocumento;
    valor!: string;
}