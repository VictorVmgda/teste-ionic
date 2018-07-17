import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
import { CadastroPage } from '../cadastro/cadastro';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public usuario: Usuario = {
    email: '',
    foto: '',
    login: '',
    nome: '',
    senha: ''
  };

  constructor(private _navCtrl: NavController, private _usuarioService: UsuarioProvider, private _storage: Storage,
    private _loadCtrl: LoadingController, private _alertCtrl: AlertController, private _authHelper: AuthProvider) {

  }

  ionViewDidLoad(){
    this._authHelper.usuarioLogado().then((a) => {
      a ? this._navCtrl.setRoot(TabsPage): '';
    }) 
  }

  efetuaLogin(){
    let alert = this._loadCtrl.create({
      content: "Verificando os dados.."
    });
    alert.present();
    
    this._usuarioService.get_one(this.usuario).then(res => {
      
      if (res != null) { 
        
        this._authHelper.logaUsuario(this.usuario).then(() => {
          this._storage.set("usuario", res);
          alert.dismiss();
          this._navCtrl.setRoot(TabsPage);
        }).catch((e) => {
          alert.dismiss();
          this._alertCtrl.create({
            title: "Login ou senha inválido",
            buttons: [{
              text: "Ok"
            }]
          }).present();
        });
      }else{
        alert.dismiss();
        this._alertCtrl.create({
          title: "Login ou senha inválido",
          buttons: [{
            text: "Ok"
          }]
        }).present();
      }

    }).catch(e => {
      this._alertCtrl.create({
        title: "Login ou senha inválido",
        buttons: [{
          text: "Ok"
        }]
      }).present();
    });
  }

  irCadastro(){
    this._navCtrl.push(CadastroPage);
  }

}
