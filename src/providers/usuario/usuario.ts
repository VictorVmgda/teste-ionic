import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider {

  basepath = "https://testrest-api.herokuapp.com/index.php/usuarios";

  constructor(public http: HttpClient) {
  }

  inserir(usuario){
    let body = "nome="+usuario.nome+"&login="+usuario.login+"&email="+usuario.email+"&foto="+usuario.foto+"&senha="+usuario.senha;
    return this.http.post(this.basepath + '/novo', body);
  }

  get_one(usuario: Usuario) {
    return this.http.get(this.basepath + '/usuario?email='+usuario.email+"&senha="+usuario.senha).toPromise();    
  }

  get_single(usuario: Usuario){
    return this.http.get(this.basepath + "/user?id="+usuario.id).toPromise();
  }

  get_all(usuario: Usuario){
    return this.http.get(this.basepath + '/usuarios?login='+usuario.login).toPromise();
  }

  update(usuario: Usuario){
    let body = "nome="+usuario.nome+"&login="+usuario.login+"&email="+usuario.email+"&foto="+usuario.foto+"&id="+usuario.id;
    return this.http.put(this.basepath + '/atualiza', body).toPromise();
  }

  atualizaSenha(usuario, senha){
    let body = "id="+usuario.id+"&senha="+senha;
    return this.http.put(this.basepath +"/atualiza_senha", body).toPromise();
  }

  deleteAcc(usuario: Usuario){
    return this.http.delete(this.basepath + '/deletar?id='+usuario.id).toPromise();
  }

}
