import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, App } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
 
  usuario = {} as Usuario;

  public myAcc: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _storage: Storage, private _alertCtrl: AlertController,
      private _loadCtrl: LoadingController, private _usuarioService: UsuarioProvider, private _app: App, private _fireAuth: AuthProvider) {
  }

  ionViewDidLoad() {

    let load = this._loadCtrl.create({
      content: "Pegando os dados"
    });

    load.present();

    this.usuario.id = this.navParams.get("id");

    if (this.usuario.id)  
      this._usuarioService.get_single(this.usuario).then((usuario: Usuario) => {
        this.myAcc = false;
        this.usuario = usuario;
        load.dismiss();
      });
    else 
      this._storage.get("usuario").then(usuario => {
        this.myAcc = true;
        this.usuario = usuario;
        load.dismiss();
    });
    
  }

  deletarConta(){
    this._alertCtrl.create({
      title: 'Deseja mesmo deletar sua conta?',
      buttons: [{
        text: "Sim",
        handler: () => {
          this._usuarioService.deleteAcc(this.usuario).then(() => {
            this._storage.clear().then(() => {
              this._fireAuth.deletaAutenticacao().then(() => {

                this._app.getRootNav().setRoot(HomePage);
                this._alertCtrl.create({ 
                  title: "Foi muito bom ter você conosco!",
                  message: "Que tal voltar um outro momento?",
                  buttons: [{
                    text: "Sair"
                  }]
                }).present();
              }).catch(e => {
                throw "";
              })

            }).catch(e => {
              this._alertCtrl.create({ 
                title: "Aconteceu algum erro!",
                message: "Tente novamente mais tarde...",
                buttons: [{
                  text: "Sair"
                }]
              }).present();
            });
          })
        }
      },
      {
        text: "Não",
      }]
    }).present();
  }

}
