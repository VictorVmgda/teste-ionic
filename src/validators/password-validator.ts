import { AbstractControl } from "../../node_modules/@angular/forms";


export class PasswordValidator{

    static validPassword(absCtrl: AbstractControl){

        if (absCtrl.get("senha").value === absCtrl.get("csenha").value) {
            return {validPassword: true}
        } else {
            return (null);
        }
    }

}