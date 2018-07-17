import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Form } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { PrincipalPage } from '../principal/principal';

import md5 from 'md5';
import { FormBuilder, FormGroup, Validators, FormControl } from '../../../node_modules/@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the MudaSenhaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-muda-senha',
  templateUrl: 'muda-senha.html',
})
export class MudaSenhaPage {

  usuario = {} as Usuario;
  senha: string = '';
  nova_senha: string = '';
  cnova_senha: string = '';

  formAlteraSenha: FormGroup = new FormGroup({
    senha: new FormControl(),
    nova_senha: new FormControl(),
    cnova_senha: new FormControl()
  });

  constructor(public navCtrl: NavController, public navParams: NavParams, private _usuarioService: UsuarioProvider, private _authHelper: AuthProvider,
      private _storage: Storage, private _alertCtrl: AlertController, private _formBuilder: FormBuilder) {
  }

  ionViewDidLoad(){

    this.formAlteraSenha = this._formBuilder.group({
      senha:  ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])],
      nova_senha:  ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])],
      cnova_senha:  ['', Validators.compose([Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])])]
    })

    this._storage.get("usuario").then(usuario => {
      this.usuario = usuario;
    })

  }

  alteraSenha(){

    if (this.usuario.senha != md5(this.senha)) {
      this._alertCtrl.create({
        title: 'Sua senha esta errada',
        buttons: [
          { text: "Fechar" }
        ]
      }).present();
      return;
    }

    if((this.nova_senha != this.cnova_senha) || this.nova_senha == "") {
      this._alertCtrl.create({
        title: 'As senhas não combinam e não devem estar vazias',
        buttons: [
          { text: "Fechar" }
        ]
      }).present();
      return;
    }

    this._usuarioService.atualizaSenha(this.usuario, this.nova_senha).then((usuario: any) =>{

      this.usuario.senha = this.nova_senha;
      this._authHelper.alteraSenha(usuario).then(() =>{

        this._storage.set("usuario", this.usuario).then(() => {
          this._alertCtrl.create({
            title: 'Senha alterada com sucesso!',
            buttons: [
                { text: "Fechar" }
              ]
            }).present();
          });
        this.navCtrl.setRoot(PrincipalPage);

      }).catch((e) => {
        this._alertCtrl.create({
          title: 'Erro ao alterar a senha!',
          buttons: [
              { text: "Fechar" }
            ]
          }).present();
        });
      });

  }

}
