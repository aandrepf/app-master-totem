export class InterfaceEmissor {
  interfaceEmissorPagina: Pagina[];
  // InterfaceEmissorPagina: Pagina[];
  retcode: number;
  retmsg: string;
}
export class Pagina {
  btnVoltar: boolean;
  descr: string;
  iconePrioritario: boolean;
  id: number;
  interfaceEmissorBotao: Botao[];
  interfaceEmissorLink: Link[];
  interfaceEmissorTituloPagina: TituloPagina[];
  msgExtra: string;
}
export class TituloPagina {
  id: number;
  idEmissorPagina: number;
  negrito: boolean;
  posicaoTexto: number;
  tamanhoFonte: number;
  textoPagina: string;
}
export class Botao {
  descLocalAtendimento: string;
  hasImage: boolean;
  iconePrioritario: boolean;
  id: number;
  idBotao: number;
  idEmissorPagina: number;
  idLocalAtendimento: number;
  nomeImage: string;
  tamanhoBotao: number;
  textoBotao: string;
  tipoBotao: number;
}
export class Link {
  descr: string;
  iconePrioritario: boolean;
  id: number;
  idEmissorPagina: number;
  idEmissorPaginasDestino: number;
  interfaceEmissorTituloLink: TituloLink[];
  tamanhoBotaolink: number;
  tipoBotao: number;
}
export class TituloLink {
  id: number;
  idEmissorPagina: number;
  idLink: number;
  negrito: boolean;
  posicaoTexto: number;
  tamanhoFonte: number;
  textoLink: string;
}

/*export class Pagina {
  BtnVoltar: boolean;
  Descr: string;
  IconePrioritario: boolean;
  Id: number;
  InterfaceEmissorBotao: Botao[];
  InterfaceEmissorLink: Link[];
  InterfaceEmissorTituloPagina: TituloPagina[];
  MsgExtra: string;
}
export class TituloPagina {
  Id: number;
  IdEmissorPagina: number;
  Negrito: boolean;
  PosicaoTexto: number;
  TamanhoFonte: number;
  TextoPagina: string;
}
export class Botao {
  DescLocalAtendimento: string;
  HasImage: boolean;
  IconePrioritario: boolean;
  Id: number;
  IdBotao: number;
  IdEmissorPagina: number;
  IdLocalAtendimento: number;
  NomeImage: string;
  TamanhoBotao: number;
  TextoBotao: string;
  TipoBotao: number;
}
export class Link {
  Descr: string;
  IconePrioritario: boolean;
  Id: number;
  IdEmissorPagina: number;
  IdEmissorPaginasDestino: number;
  InterfaceEmissorTituloLink: TituloLink[];
  TamanhoBotaolink: number;
  TipoBotao: number;
}
export class TituloLink {
  Id: number;
  IdEmissorPagina: number;
  IdLink: number;
  Negrito: boolean;
  PosicaoTexto: number;
  TamanhoFonte: number;
  TextoLink: string;
}*/
