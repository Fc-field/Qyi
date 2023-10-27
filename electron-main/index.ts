 // electron-main/index.ts
 import { app, BrowserWindow } from "electron"
 import path from "path"
  
 const createWindow = () => {
   const win = new BrowserWindow({
     webPreferences: {
       contextIsolation: false, // 是否开启隔离上下文
       nodeIntegration: true, // 渲染进程使用Node API
       preload: path.join(__dirname, "./preload.js"), // 需要引用js文件
     },
   })
  
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
   createWindow() // 创建窗口
   app.on("activate", () => {
     if (BrowserWindow.getAllWindows().length === 0) createWindow()
   })
 })
  
 // 关闭窗口
 app.on("window-all-closed", () => {
   if (process.platform !== "darwin") {
     app.quit()
   }
 }) 