export default class Tecnologia {
    id?: number;
    nome?: string;
    descricao?: string;
    periodicidade?: string;
    log_execucao?: string;
    processo?: string;
    status?: string
    constructor(id?: number, nome?: string, descricao?: string, periodicidade?: string, log_execucao?: string, processo?: string, status?: string) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.periodicidade = periodicidade;
        this.log_execucao = log_execucao;
        this.processo = processo;
        this.status = status;
    }
}