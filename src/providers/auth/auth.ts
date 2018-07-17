import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public http: HttpClient, private _fireAuth: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }

  async usuarioLogado(){
    return await this._fireAuth.auth.currentUser;
  }

  criaAutenticacaoUsuario(usuario: Usuario): Promise<any>{
    return this._fireAuth.auth.createUserWithEmailAndPassword(usuario.email, usuario.senha);
  }

  logaUsuario(usuario: Usuario): Promise<any>{
    return this._fireAuth.auth.signInWithEmailAndPassword(usuario.email, usuario.senha);
  }

  alteraEmail(usuario: Usuario){
    return this._fireAuth.auth.currentUser.updateEmail(usuario.email);
  }

  alteraSenha(usuario: Usuario): Promise<any>{
    return this._fireAuth.auth.currentUser.updatePassword(usuario.senha);
  }

  logout(): Promise<any>{
    return this._fireAuth.auth.signOut();
  }

  deletaAutenticacao(){
    return this._fireAuth.auth.currentUser.delete();
  }

}
