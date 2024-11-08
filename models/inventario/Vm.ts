import Ambiente from "./Ambiente";
import Cluster from "./Cluster";
import Grupo from "./Grupo";
import Responsavel from "./Responsavel";
import Servico from "./Servico";
import Tecnologia from "./Tecnologia";
import TipoVm from "./TipoVm";

export default class Vm{
    id?: number;
    nome!: string;
    hostname!: string;
    ip_address!: string;
    tipoVm!: TipoVm;
    cluster!: Cluster;
    status!: string;
    grupos!: Array<Grupo>;
    ambientes!: Array<Ambiente>;
    responsaveis!: Array<Responsavel>;
    servicos!: Array<Servico>;
    sistemas!: Array<Tecnologia>

}