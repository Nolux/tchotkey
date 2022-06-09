const { contextBridge, ipcRenderer } = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("hotkey", {
  send: (data) => {
    ipcRenderer.invoke("hotkey", data);
  },
  receive: (func) => {
    ipcRenderer.on("hotkey", (e, data) => func(data));
  },
});
