// models/publication.ts

import { TypeRecurso } from "./typerecurso";
import { Useror } from "./useror";

export class Publication extends TypeRecurso{
  idPublication: number = 0;
  title: string = '';
  description: string = '';
  archivo: string = '';
  datePublication: Date = new Date();
  id_TypeRecurso: TypeRecurso = new TypeRecurso();
  idUser: Useror = new Useror();
}


/*export class Publication{
    idPublication:number=0;
    title:String="";
    description:String="";
    data: number[]=[];
    datePublication:Date=new Date(Date.now());
    id_TypeRecurso:TypeRecurso=new TypeRecurso();
    idUser:Useror=new Useror();
}*/