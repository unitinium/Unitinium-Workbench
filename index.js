const isDev = process.env.APP_ENV === "DEV";

const { app, BrowserWindow } = require("electron");
const { autoUpdater } = require("electron-updater");
const electronLocalshortcut = require("electron-localshortcut");
const path = require('path');
const url = require("url");

var log = require('electron-log');
log.transports.file.level = 'debug';
log.transports.console.level = 'debug';
autoUpdater.logger = log;

log.info("application version: " + app.getVersion() + "\n");

let win;

/**
 * Create main electron window
 */
function createWindow() {
  win = new BrowserWindow({
    fullscreen: false,
    autoHideMenuBar: true,
    webPreferences: { webSecurity: false, experimentalFeatures: true },
    icon: "./src/favicon.ico"
  });

  loadMain();

  win.on("closed", () => {
    win = null;
  });

  electronLocalshortcut.register(win, "F12", () => {
    win.webContents.openDevTools();
  });

  electronLocalshortcut.register(win, "F5", () => {
    loadMain();
  });

  /**
   * Configure automatic updates
   */
  if(!isDev) {
    setInterval(() => {
      log.info('check for updates...');
      autoUpdater.checkForUpdates();
    }, 200000); // check updates ever 20 min

    log.info('check for updates...');
    autoUpdater.checkForUpdates();

    autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
      log.info('update downloaded! quit and install!');
      autoUpdater.quitAndInstall();
    });

    autoUpdater.on('error', message => {
      log.error('There was a problem updating the application');
      log.error(message);
    });
  }
}

/**
 * Load the main index.html window
 */
function loadMain() {
    let indexUri = url.format({
        pathname: path.join(__dirname, 'dist/uw/Unitinium-Workbench/dist/index.html'),
        protocol: 'file:',
        slashes: true
    })

    if (isDev) {
        indexUri = url.format({
            pathname: "localhost:5000",
            protocol: "http:",
            slashes: true
        })
    }

    log.info("load uri: " + indexUri + "\n");
    win.loadURL(indexUri);
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});