import { Useror } from "./useror"

export class Roles extends Useror{
    idTypeUser: number = 0
    typeAccount : string = ""
    stateType: boolean = false
    useror:Useror = new Useror()
}