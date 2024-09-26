export interface Membro {
    id: number,
    nome: string,
    dataNascimento: Date,
    dataBastismo: Date,
    endereco: Endereco,
    cargos: Cargo[],
    contatos: Contato[],
    parentes: Parente[]
}

interface Endereco {
    rua: string,
    numero: number,
    complemento?: string,
    bairro: string;
    cidade: string,
    estado: string,
    pais: string
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

interface Contato {
    tipo: string,
    valor: string
}

interface Parente {
    nome: string;
    parentesco: string
}