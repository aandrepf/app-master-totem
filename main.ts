import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
const args = require('electron-args');

// tslint:disable-next-line:prefer-const
let win: BrowserWindow;
// tslint:disable-next-line: prefer-const
let cli = args(`
    app
    Usage
    $ app --arg
    $ app --arg=value
    Options
    --debug     modo debug [Default: false]
    --ssl       protocolo de segurança [Default: false]
    --endpoint  ip ou hostname do totem
    `,
    {
    default: {
        debug: false,
        ssl: false,
        endpoint: 'localhost'
    }
});

console.log('MODO DEBUG ATIVADO?', cli.flags.debug);
console.log('IP/HOSTNAME DO TOTEM:', cli.flags.endpoint);

app.disableHardwareAcceleration();

app.on('ready', () => {
  createWindow();
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

function createWindow() {
    win = new BrowserWindow({
        // width: 1366, height: 768
        // fullscreen: true,
        resizable: false,
        kiosk: true,
        webPreferences: {
          nodeIntegration: true,
          backgroundThrottling: false
        }
    });

    win.setAutoHideMenuBar(true);
    win.setMenuBarVisibility(false);

    // carrega a aplicação baseada no local onde esta o app minificado
    win.loadURL(
        url.format({
          pathname: path.join(__dirname, `./dist/index.html`),
          protocol: 'file:',
          slashes: true,
        })
      );

      // abre o DEVTOOLS do Chrome
      if (cli.flags.debug) {
        win.webContents.openDevTools();
      }

      // fecha o electron
      win.on('closed', () => {
        win = null;
        app.quit();
      });

      // abre a comunicação com a aplicação Angular
      ipcMain.on('com', (e, p) => comunication(e, p));
  }

  function comunication(e, p) {
    console.log('PARAMS', p);
    switch (p.evt) {
      case 'login':
        win.setClosable(false);
        break;
      case 'logout':
        win.setClosable(true);
        break;
      case 'startup':
        e.returnValue = { endpoint: cli.flags.endpoint, ssl: Boolean(cli.flags.ssl), debug: cli.flags.debug };
        break;
      case 'notify':
        console.log(p.data);
      break;
    }
  }

