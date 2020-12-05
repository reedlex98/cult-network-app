export interface SearchBookResponse {
  Id: string;
  Titulo: string;
  Autor: string;
  DescricaoLivro: string;
  QtdTotalPaginas: number;
  Idioma: string;
  Isbn: string;
  idUsuarioLivro: string;
  EnderecoUsuarioLivro: string;
  CelularUsuarioLivro: string;
  LatitudeUsuarioLivro: string;
  LongitudeUsuarioLivro: string;
  DataEdicao: string;
  DataRegistro: string;
  Distancia?: number;
  UsuarioNome?: string;
}
