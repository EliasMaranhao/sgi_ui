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

export class Endereco {
    rua!: string;
    numero!: number;
    complemento?: string;
    bairro!: string;
    cidade!: string;
    estado!: string;
    pais!: string;
    cep!: string;
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

export enum Cargo {
    MEMBRO = 'Membro',
    AUXILIAR = 'Auxiliar',
    OBREIRO = 'Obreiro',
    DIACONO = 'Diácono',
    PRESBITERO = 'Presbítero',
    EVANGELISTA = 'Evangelista',
    BISPO = 'Bispo',
    PASTOR = 'Pastor',
    TESOUREIRO = 'Tesoureiro',
    SECRETARIO = 'Secretário',
    LIDER_LOUVOR = 'Líder do Ministério de Música',
    MUSICO = 'Músico'
}

export enum TipoContato {
    TELEFONE = 'Telefone',
    EMAIL = 'Email'
}

export enum Genero {
    MASCULINO = 'Masculino',
    FEMININO = 'Feminino'
}

export enum Denominacao {
    ASSEMBLEIA_DE_DEUS = 'Assembléia de Deus',
    BATISTA = 'Batista',
    NOVA_VIDA = 'Nova Vida',
    VIDA_NOVA = 'Vida Nova',
    IGREJA_UNIVERSAL_DO_REINO_DE_DEUS = 'Igreja Universal do Reino de Deus',
    DEUS_E_AMOR = 'Deus é Amor',
    IGREJA_DA_RESTAURACAO = 'Igreja da Restauração'
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

export class Igreja {
    id?: number;
    nome!: string;
    endereco!: Endereco;
    igrejaPai!: Igreja;
    denominacao!: Denominacao;
}

export class Documento {
    tipoDocumento!: TipoDocumento;
    valor!: string;
}