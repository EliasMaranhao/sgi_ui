import { Membro } from "src/app/membros/cadastro/model/membro";
import { Endereco } from "src/app/model/core";

export class Igreja {
    id?: number;
    nome!: string;
    endereco!: Endereco;
    igrejaPai!: Igreja;
    denominacao!: Denominacao;
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

export class Funcao {
    id?: number;
    nome!: string
}

export class Cargo {
    id?: CargoFuncaoId;
    dataPosse!: Date;
    dataDestituicao?: Date
    membro!: Membro;
    funcao!: Funcao;
}

export class CargoFuncaoId {
    membroId?: number;
    funcaoId?: number;
}