import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform, LoadingController, AlertController } from 'ionic-angular';

import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
import { ImageHelper } from '../../helpers/image.helper';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '../../../node_modules/@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})

export class CadastroPage {

  public usuario = { foto: 'assets/imgs/undefined.jpg' } as Usuario;
  public mobile: boolean;

  public formCadastro: FormGroup = new FormGroup({
    nome: new FormControl(),
    login: new FormControl(),
    email: new FormControl(),
    senha: new FormControl(),
    csenha: new FormControl()
  });

  constructor(private _navCtrl: NavController, private _navParams: NavParams, private _platform: Platform, private _storage: Storage,
      private _usuarioService: UsuarioProvider, private _alertCtrl: AlertController, private  _loadCtrl: LoadingController,
      private _actionSheetCtrl: ActionSheetController, private _imageHelp: ImageHelper, private _formBuilder: FormBuilder,
      private _authHelper: AuthProvider) {
  
  }

  ionViewDidLoad(){

    this.mobile = this._platform.is("mobile");

    this.formCadastro = this._formBuilder.group({
      nome: ['',Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      login: ['',Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])],
      email: ['',Validators.compose([Validators.required, Validators.minLength(15), Validators.email])],
      senha: ['',Validators.compose([Validators.required, Validators.minLength(8)])],
      csenha: ['', Validators.required]
    })
    console.log(this._platform.navigatorPlatform());
  }

  cadastrar(){
    if (this.formCadastro.invalid || (this.usuario.senha != this.usuario.csenha)) {

      this._alertCtrl.create({
        title: "Dados inválidos",
        subTitle: "Verifique se digitou todos os campos corretamente",
        buttons: [{
          text: "Fechar"
        }]
      }).present();
      return;
    }

    let load = this._loadCtrl.create({
      content: "Salvando os dados"
    })

    load.present();

    this._usuarioService.inserir(this.usuario).toPromise().then(res => {

      this._authHelper.criaAutenticacaoUsuario(this.usuario).then(() => {
        this._storage.set("usuario", res);
        this._navCtrl.setRoot(TabsPage);
        load.dismiss();
      }).catch((e) => {
        throw e;
      });

    }).catch(e =>{
      load.dismiss();
      this._alertCtrl.create({
        title: 'Erro ao cadastrar',
        subTitle: 'Tente novamente mais tarde',
        buttons: [
          { text: "Fechar" }
        ]
      }).present();
      
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

  isMobile(){
    (this._platform.is('core') || this._platform.is('mobileweb')) ? false : true;
  }

}
