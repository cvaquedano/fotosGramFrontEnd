export interface RespuestasPosts {
  ok: boolean;
  pagina: number;
  posts: Post[];
}

export interface Post {
  imgs?: string[];
  _id?: string;
  coords?: string;
  usuario?: Usuario;
  mensaje?: string;
  created?: string;

}

export interface Usuario {
  avatar?: string;
  _id?: string;
  nombre?: string;
  email?: string;

}
