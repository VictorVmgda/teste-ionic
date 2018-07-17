import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ActionSheetController, Platform, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ImageHelper } from '../../helpers/image.helper';
import { UsuarioProvider } from '../../providers/usuario/usuario';

import { FormGroup, FormControl, Validators, FormBuilder } from '../../../node_modules/@angular/forms';
import { MudaSenhaPage } from '../muda-senha/muda-senha';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the EditarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar',
  templateUrl: 'editar.html',
})
export class EditarPage {

  usuario = { foto: "assets/imgs/undefined.jpg" } as Usuario;

  mobile: boolean;

  public formEditar: FormGroup = new FormGroup({
    nome: new FormControl(),
    login: new FormControl(),
    email: new FormControl(),
  });

  constructor(public navCtrl: NavController, public navParams: NavParams, private _loadCtrl: LoadingController, private _platform: Platform,
    private _storage: Storage, private _actionSheetCtrl: ActionSheetController, private _imageHelp: ImageHelper,
    private _usuarioService: UsuarioProvider, private _formBuilder: FormBuilder, private _fireAuth: AuthProvider) {
  }

  ionViewDidLoad() {

    this.mobile = this._platform.is("mobile");

    let load = this._loadCtrl.create({
      content: 'Carregando os dados',
    })
    load.present();

    this.formEditar = this._formBuilder.group({
      nome: ['',Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      login: ['',Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])],
      email: ['',Validators.compose([Validators.required, Validators.minLength(15), Validators.email])]
    });

    this._storage.get("usuario").then(usuario =>{
      this.usuario = usuario;
      load.dismiss();
    })
    
  }

  atualizar(){
    console.log(this.usuario);
    
    let load = this._loadCtrl.create({
      content: "Alterando os dados"
    });
    load.present();

    this._usuarioService.update(this.usuario).then(res => {

      this._fireAuth.alteraEmail(this.usuario).then(() => {

        this._storage.set("usuario",this.usuario);
        this.navCtrl.parent.select(0);
        load.dismiss();
      }).catch(e => {
        throw "";
      });

    }).catch(e =>{
      load.dismiss();
      alert("Algo deu errado! :^(");
    })
  }
  
  uploadImage(){
    this._actionSheetCtrl.create({
      title: 'Selecione uma opção',
      buttons: [{
        text: 'Tirar Foto',
        handler: () => { 
          this._imageHelp.tirarFoto().then((imageData) => {
            this.usuario.foto = 'data:image/jpeg;base64,'+ imageData;
          });
        },
        icon: 'camera'
      }, {
        text: 'Enviar Foto',
        handler: () => {
          this._imageHelp.enviarFoto().then((imageData) => {
            this.usuario.foto = 'data:image/jpeg;base64,'+ imageData;
          });
        },
        icon: 'cloud-upload'
      }]
    }).present();
  }

  uploadImageWeb(event){
    let load = this._loadCtrl.create({
      content: "Enviando foto..."
    });

    load.present();

    let file = event.target.files[0];

    if (file) {
      let reader = new FileReader();
      
      reader.onloadend = (evt: any) => {
        let base64: string = evt.target.result;
        this.usuario.foto = base64.replace(" ", "+");
        load.dismiss();
      }
      
      reader.readAsDataURL(file); 
    }
  }

  irMudarSenha(){
    this.navCtrl.push(MudaSenhaPage);
  }

}
