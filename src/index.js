const {
  app,
  BrowserWindow,
  globalShortcut,
  Menu,
  ipcMain,
  clipboard,
} = require("electron");
const path = require("path");
const dayjs = require("dayjs");

// Live Reload
require("electron-reload")(__dirname, {
  electron: path.join(__dirname, "../node_modules", ".bin", "electron"),
  awaitWriteFinish: true,
});

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

let alwaysOntop = true;

const displayWithLeadingZero = (input) => {
  return input < 10 ? `0${input}` : input;
};

ipcMain.handle("hotkey", (e, data) => {
  console.log(data);
  clipboard.writeText(data);
});

let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 650,
    height: 150,
    resizable: false,
    fullscreenable: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"), // use a preload script
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "../public/index.html"));

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();

  mainWindow.setAlwaysOnTop(alwaysOntop, "floating");

  // Setup hotkey

  globalShortcut.register("CommandOrControl+G", () => {
    mainWindow.webContents.send("hotkey", "CommandOrControl+G");
  });
  globalShortcut.register("CommandOrControl+q", () => {
    app.quit();
  });

  // Create menu
  template = [
    {
      label: app.name,
      submenu: [
        { label: "About" },
        { role: "toggleDevTools" },
        { type: "separator" },
        {
          label: "Exit",
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: "Settings",
      submenu: [
        {
          label: "Always on top",
          type: "checkbox",
          checked: alwaysOntop,
          click: () => {
            alwaysOntop = !alwaysOntop;
            mainWindow.setAlwaysOnTop(alwaysOntop, "floating");
          },
        },
        {
          label: "TC source",
          submenu: [
            { label: "System Clock", checked: true, type: "checkbox" },
            { label: "External TC", enabled: false },
            { label: "Network time", enabled: false },
          ],
        },
      ],
    },
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  mainWindow.webContents.send("hotkey", "12345");
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
