import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';
import { async } from '@angular/core/testing';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string = null;
  private usuario: Usuario = {};

  constructor(private http: HttpClient,
              private storage: Storage,
              private navCtrl: NavController
              ) { }


  login(email: string, password: string) {

    const data = { email, password};

    return new Promise(resolve => {

      this.http.post(`${URL}/user/login`, data)
      .subscribe(async respuesta => {
        console.log(respuesta);

        if ( respuesta['ok']) {
          await this.guardarToken(respuesta['token']);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);

        }

      });
    });

  }

  logout() {
    this.token = null;
    this.usuario =  null;
    this.storage.clear();
    this.navCtrl.navigateRoot('/login', {animated: true});
  }

  registro(usuario: Usuario) {
    return new Promise(resolve => {
      this.http.post(`${URL}/user/create`, usuario)
      .subscribe(async respuesta => {
        console.log(respuesta);

        if ( respuesta['ok']) {
          await this.guardarToken(respuesta['token']);
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
    await this.validaToken();
  }

  async cargarToken() {
    this.token = await this.storage.get('token') || null;
  }

  getUsurio() {

    if (!this.usuario._id) {
      this.validaToken();
    }
    return {...this.usuario};

  }

  async validaToken(): Promise<boolean> {

    await this.cargarToken();

    if (!this.token) {

      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);

    }

    return new Promise<boolean> (resolve => {
      const headers = new HttpHeaders({
        'x-token': this.token
      });

      this.http.get(`${URL}/user/`, {headers})
      .subscribe(resp => {
        if ( resp['ok'] ) {
          this.usuario = resp['usuario'];
          resolve(true);

        } else {
          this.navCtrl.navigateRoot('/login');
          resolve(false);
        }

      });
    });
  }

  actualizarUsuario(usurio: Usuario) {
    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return new Promise(resolve => {

      this.http.post(`${URL}/user/update`, usurio, {headers})
      .subscribe( resp => {
        if (resp['ok']) {
          this.guardarToken(resp['token']);
          resolve(true);
        } else {
          resolve(false);

        }

      });

    });

  }
}
