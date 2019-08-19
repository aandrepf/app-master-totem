"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var args = require('electron-args');
// tslint:disable-next-line:prefer-const
var win;
var cli = args("\n    app\n    Usage\n    $ app --arg\n    $ app --arg=value\n    Options\n    --debug     modo debug [Default: false]\n    --ssl       protocolo de seguran\u00E7a [Default: false]\n    --endpoint  ip ou hostname do totem\n    ", {
    default: {
        debug: false,
        ssl: false
    }
});
console.log('MODO DEBUG ATIVADO?', cli.flags.debug);
console.log('IP/HOSTNAME DO TOTEM:', cli.flags.endpoint);
electron_1.app.on('ready', function () {
    createWindow();
});
electron_1.app.on('activate', function () {
    if (win === null) {
        createWindow();
    }
});
function createWindow() {
    win = new electron_1.BrowserWindow({
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
    // carrega a aplicação baseada no local onde esta o app minificado
    win.loadURL(url.format({
        pathname: path.join(__dirname, "./dist/index.html"),
        protocol: 'file:',
        slashes: true,
    }));
    // abre o DEVTOOLS do Chrome
    if (cli.flags.debug) {
        win.webContents.openDevTools();
    }
    // fecha o electron
    win.on('closed', function () {
        win = null;
        electron_1.app.quit();
    });
    // abre a comunicação com a aplicação Angular
    electron_1.ipcMain.on('com', function (e, p) { return comunication(e, p); });
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
//# sourceMappingURL=main.js.map