import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { PerfilPage } from '../perfil/perfil';

@IonicPage()
@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
})
export class PrincipalPage {
  
  public usuarios;
  public usuario: Usuario;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _usuarioService: UsuarioProvider, private _storage: Storage,
      private _loadCtrl: LoadingController) {
  }


  ionViewDidLoad(){
    let load = this._loadCtrl.create({
      content: "Carregando as informações..."
    });

    load.present();

    this._storage.get("usuario").then(usuario => {

      this.usuario = usuario;
      this._usuarioService.get_all(usuario).then((usuarios) => {
        this.usuarios = usuarios;
      });
      load.dismiss();
      
    })
    .catch(() => this.navCtrl.setRoot(HomePage))
    
  }

  verPerfil(id){
    this.navCtrl.push(PerfilPage,{id: id});
  }

}
