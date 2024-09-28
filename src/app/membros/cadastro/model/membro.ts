export class Membro {
    public id?: number;
    public nome!: string;
    public dataNascimento!: Date;
    public dataConversao?: Date;
    public dataBatismo!: Date;
    public dataRecebido?: Date;
    public igrejaOrigem?: string;
    public estadoCivil!: EstadoCivil;
    public situacaoMembro!: SituacaoMembro;
    public veioOutraIgreja!: boolean;
    public veioOutroCampo!: boolean;
    public campoOrigem?: string;
    public igreja!: Igreja;
    public documento!: Documento;
    public genero!: Genero;
    public endereco!: Endereco;
}

export class Endereco {
    public rua!: string;
    public numero!: number;
    public complemento?: string;
    public bairro!: string;
    public cidade!: string;
    public estado!: string;
    public pais!: string;
    public cep!: string;
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

enum Cargo {
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

enum TipoParentesco {
    IRMAO,
    PRIMO,
    PAI,
    MAE,
    AVO,
    TIO,
    TIA
}

export class Contato {
    private tipoContato!: TipoContato;
    private valor!: string;
}

export class Parente {
    private nome!: string;
    private tipoParentesco!: TipoParentesco;
}

export class Igreja {
    public id?: number;
    public nome!: string;
    public endereco!: Endereco;
    public igrejaPai!: Igreja;
    public denominacao!: Denominacao;
}

export class Documento {
    public tipoDocumento!: TipoDocumento;
    public valor!: string;
}