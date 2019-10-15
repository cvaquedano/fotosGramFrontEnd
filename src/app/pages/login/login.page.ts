import { Component, OnInit, ViewChild } from '@angular/core';

import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgForm } from '@angular/forms';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Usuario } from 'src/app/interfaces/interfaces';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal') slides: IonSlides;




loginUser = {
  email: 'chvb2002@gmail.com',
  password: '123456'
};

registerUser: Usuario = {
  email: 'chvb2002@test.com',
  password: '123456',
  nombre: 'Test',
  avatar: 'av-1.png'
};

  constructor(private usuarioService: UsuarioService,
              private navCtrl: NavController,
              private uiService: UiServiceService) { }

  ngOnInit() {
    this.slides.lockSwipes(true);
  }

  async login(fLogin: NgForm) {

    if (!fLogin.valid) { return; }

    const valido = await this.usuarioService.login(this.loginUser.email, this.loginUser.password);

    if (valido) {
      this.navCtrl.navigateRoot('/main/tabs/tab1', {
        animated: true});
    } else {
      this.uiService.alertaInformativa('Usuario y contraseña no son validos');


    }




  }

  async registro(fRegistro: NgForm) {
    if (!fRegistro.valid) { return; }

    const valido = await this.usuarioService.registro( this.registerUser );

    if (valido) {
      this.navCtrl.navigateRoot('/main/tabs/tab1', {
        animated: true});
    } else {
      this.uiService.alertaInformativa('El correo ya existe');


    }
  }

  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);

  }

  mostrarLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);

  }

}
