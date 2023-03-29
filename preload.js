const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    openFile: (number) => ipcRenderer.invoke('dialog:openFile', number)
})