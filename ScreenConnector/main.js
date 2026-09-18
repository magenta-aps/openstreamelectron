const { app, BrowserWindow, ipcMain } = require("electron");

let mainWindow;
let heightVal = null;
let widthVal = null;
let fullUrl = null;

process.argv.forEach((arg, index) => {
  if (arg.startsWith("--height=")) {
    heightVal = arg.split("=")[1];
  } else if (arg.startsWith("--width=")) {
    widthVal = arg.split("=")[1];
  } else if (arg.startsWith("--url=")) {
    // preserve everything after the first '=' (in case the URL contains additional '=' chars)
    fullUrl = arg.split("=").slice(1).join("=");
    // strip surrounding single or double quotes if present
    if ((fullUrl.startsWith('"') && fullUrl.endsWith('"')) || (fullUrl.startsWith("'") && fullUrl.endsWith("'"))) {
      fullUrl = fullUrl.slice(1, -1);
    }
  }
});

if (!fullUrl) {
  console.error("Full URL not provided. Use --url=FULL_URL");
  app.quit();
}

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    show: false,
    fullscreen: true,
    height: parseInt(heightVal),
    width: parseInt(widthVal),
    webPreferences: {
      webviewTag: true,
      contextIsolation: true,
      sandbox: true,
    },
  });

  mainWindow.once("ready-to-show", () => {
    mainWindow.maximize();
    mainWindow.show();
  });

  if (fullUrl) {
    mainWindow.loadURL(fullUrl, {});
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
