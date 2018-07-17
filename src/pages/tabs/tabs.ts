import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs, AlertController, Platform } from 'ionic-angular';
import { PrincipalPage } from '../principal/principal';
import { EditarPage } from '../editar/editar';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { PerfilPage } from '../perfil/perfil';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  
  usersView = PrincipalPage;
  userEdit = EditarPage;
  userProfile = PerfilPage; 
  mobile: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _storage: Storage, private _authHelper: AuthProvider,
      private _alertCtrl: AlertController, private _platform: Platform) {
  }

  ionViewDidLoad(){
    this._authHelper.usuarioLogado().then(() =>{
      this.mobile = this._platform.is("mobile");
    }).catch(e => {
      this.navCtrl.setRoot(HomePage);
    })
  }

  logout(){ 
    this._authHelper.logout().then(() => {
      this._storage.clear().then(() => {
        this.navCtrl.setRoot(HomePage);
        this._alertCtrl.create({
          title: 'Deslogado com sucesso!',
          buttons: [{
            text: "OK"
          }]
        }).present();

      })
    })
  }

  public setRootDeleteAcc(){
    this._authHelper.logout().then(() => {
      this._storage.clear().then(() => {
        this.navCtrl.setRoot(HomePage);
        this._alertCtrl.create({ 
          title: "Foi muito bom ter você conosco!",
          message: "Que tal voltar um outro momento?",
          buttons: [{
            text: "Sair"
          }]
        }).present();
      });
    });
  }

}
 