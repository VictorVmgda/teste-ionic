import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule, AngularFireAuth } from "angularfire2/auth";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Camera } from '../../node_modules/@ionic-native/camera';
import { Transfer } from '../../node_modules/@ionic-native/transfer';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { HttpClient, HttpClientModule } from '../../node_modules/@angular/common/http';
import { TabsPage } from '../pages/tabs/tabs';
import { PrincipalPage } from '../pages/principal/principal';
import { EditarPage } from '../pages/editar/editar';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { ImageHelper } from '../helpers/image.helper';
import { PerfilPage } from '../pages/perfil/perfil';
import { MudaSenhaPage } from '../pages/muda-senha/muda-senha';
import { AuthProvider } from '../providers/auth/auth';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PrincipalPage,
    EditarPage,
    CadastroPage,
    TabsPage,
    PerfilPage,
    MudaSenhaPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyA4nnAQJBB4Y1_7Qpkgi4lUFInsdo1iWJ4",
      authDomain: "ionproject-95ce1.firebaseapp.com",
      databaseURL: "https://ionproject-95ce1.firebaseio.com",
      projectId: "ionproject-95ce1",
      storageBucket: "ionproject-95ce1.appspot.com",
      messagingSenderId: "1004055366646"
    }),
    AngularFireAuthModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PrincipalPage,
    EditarPage,
    CadastroPage,
    TabsPage,
    PerfilPage,
    MudaSenhaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClient,
    Camera,
    Transfer,
    AngularFireAuth,
    ImageHelper,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioProvider,
    AuthProvider
  ]
})
export class AppModule {}
