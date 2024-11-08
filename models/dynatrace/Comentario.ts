import Problema from "./Problema";

export default class Comentario {
    id!: number;
    authorName!: string;
    content!: string
    problemId?: Problema
}