// electron-preload/index.ts
import { contextBridge, ipcRenderer } from 'electron';

const electronHandler = {
  ipcRenderer: {
    //设置store数据
    setStoreValue: (key: string, value: any) => {
      ipcRenderer.send("setStore", key, value);
    },
    //获得store数据
    getStoreValue: (key: string)=> {
      const resp = ipcRenderer.sendSync("getStore", key);
      return resp;
    },
  },
}

contextBridge.exposeInMainWorld('electronAPI', electronHandler);
