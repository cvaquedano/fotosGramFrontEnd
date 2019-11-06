import { Component } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: string[] = [];

  cargandoGeo = false;

  post = {
    mensaje: '',
    coords: null,
    posicion: false
  };

  constructor( private geolocation: Geolocation,
               private postService: PostsService, private ruote: Router) {}

  async crearPost() {
    console.log(this.post);
    const creado = await this.postService.crearPost(this.post);
    this.post = {
      mensaje: '',
    coords: null,
    posicion: false
    };

    this.ruote.navigateByUrl('/main/tabs/tab1');

  }

  getGeo() {
    if (!this.post.posicion) {
      this.post.coords = null;
      return;
    }

    this.cargandoGeo = true;

    this.geolocation.getCurrentPosition().then((resp) => {
      this.cargandoGeo = true;
      const coords = `${resp.coords.latitude},${ resp.coords.longitude}`;
      this.post.coords = coords;
      console.log(coords);
    })
     .catch((error) => {
       console.log('Error getting location', error);
     });
  }

}
