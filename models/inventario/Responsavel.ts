import Cargo from "./Cargo";
import Gerencia from "./Gerencia";
import Pessoa from "./Pessoa";
import TipoContratacao from "./TipoContratacao";

export default class Responsavel{
    id?: number;
    nome?: string;
    atividades?: string;
    gerente?: boolean;
    status?: boolean;
    gerencia?: Gerencia;
    cargo?: Cargo;
    tipoContratacao?: TipoContratacao;
    pessoa?: Pessoa

    constructor(id?: number, nome?: string, atividades?: string, gerente?: boolean, status?: boolean, gerencia?: Gerencia, 
        cargo?: Cargo, tipoContratacao?: TipoContratacao, pessoa?: Pessoa) {
        this.id = id;
        this.nome = nome;
        this.atividades = atividades;
        this.gerente = gerente;
        this.status = status;
        this.gerencia = gerencia;
        this.cargo = cargo;
        this.tipoContratacao = tipoContratacao;
        this.pessoa = pessoa;

    }
}