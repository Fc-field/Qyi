 // electron-main/index.ts
import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import Store from "electron-store";

 const store = new Store();
  
 const createWindow = () => {
   const win = new BrowserWindow({
     height: 680,
     width: 1020,
     titleBarStyle: "hidden",
    //  titleBarOverlay: true,
     frame: false,//无边框
     webPreferences: {
       //  contextIsolation: true, // 是否开启隔离上下文
       //  nodeIntegration: true, // 渲染进程使用Node API
       preload: path.join(__dirname, "./preload.js"), // 需要引用js文件
     },
     show: false, //解决开屏闪烁
   });
   win.once('ready-to-show', () => {
     win.show();
   });


  // 定义ipcRenderer监听事件
  ipcMain.on('setStore', (_, key, value) => {
    console.log(store.path);
    store.set(key, value);
  });

  ipcMain.on('getStore', (_, key) => {
    let value = store.get(key)
    _.returnValue = value || ""
  });
  //最小化
  ipcMain.on("win-min", (_) => {
    win.minimize();
  });
   //最大化和复原
   ipcMain.on("win-max", (_) => {
     if (win.isMaximized()) {
       win.restore(); //复原  
     }
     else {
       win.maximize();
     }
   });
   //关闭窗口
   ipcMain.on("win-close", (_) => {
     win.close();
   });
   
   // 如果打包了，渲染index.html
   if (process.env.NODE_ENV !== 'development') {
     win.loadFile(path.join(__dirname, "./index.html"))
     win.webContents.openDevTools()
   } else {
     let url = "http://localhost:5173" // 本地启动的vue项目路径。注意：vite版本3以上使用的端口5173；版本2用的是3000
     win.loadURL(url)
     win.webContents.openDevTools()
   }
 }
  
app.whenReady().then(() => {

  
  
  createWindow(); // 创建窗口

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  });
 })
  
 // 关闭窗口
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
});

 



 