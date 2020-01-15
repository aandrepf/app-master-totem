import { Pagina } from './models/interface.model';

export class Global {
  public static CONFIG_URL = './assets/configs/urls.json';
  public static CONFIG_TELA_INTERFACE = './assets/tela_interface.json';
  public static BASE_EMITIR_TICKET = 'EmissorServlet/EmitirTicket?';
  public static VERSAO_EMISSOR = 'EmissorServlet/GetVersaoEmissor';
  public static NAVIGATION;
  public static PAGEITEM: Pagina[];
}
