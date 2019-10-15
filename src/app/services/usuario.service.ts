import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';
import { Usuario } from '../interfaces/interfaces';
import { url } from 'inspector';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string = null;

  constructor(private http: HttpClient,
              private storage: Storage
              ) { }


  login(email: string, password: string) {

    const data = { email, password};

    return new Promise(resolve => {

      this.http.post(`${URL}/user/login`, data)
      .subscribe(respuesta => {
        console.log(respuesta);

        if ( respuesta['ok']) {
          this.guardarToken(respuesta['token']);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);

        }

      });
    });

  }

  registro(usuario: Usuario) {
    return new Promise(resolve => {
      this.http.post(`${URL}/user/create`, usuario)
      .subscribe(respuesta => {
        console.log(respuesta);

        if ( respuesta['ok']) {
          this.guardarToken(respuesta['token']);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);

        }

      });

    });

  }

  async guardarToken( token: string) {

    this.token = token;
    await this.storage.set('token', token);
  }
}
