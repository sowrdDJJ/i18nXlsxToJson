const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { handleFileOpen } = require('./fileCreate');


function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 500,
        height: 300,
        // width: 1000,
        // height: 1200,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
        center: true,
        resizable: false,
        maximizable: false
    });
    mainWindow.setMenu(null);
    mainWindow.loadFile("index.html");
    // mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
    // 建立IPC通讯
    ipcMain.handle('dialog:openFile', handleFileOpen);
    
    createWindow();
    app.on("activate", function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
});

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'