// electron-preload/index.ts
import { contextBridge, ipcRenderer } from 'electron';
import { data } from '@/utils';
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
    //窗口最小化
    minimizeWin: () => {
      ipcRenderer.send("win-min");
    },
    //最大化
    maximizeWin: () => {
      ipcRenderer.send("win-max");
    },
    //关闭窗口
    closeWin: (musicList: data[]) => {
      ipcRenderer.send("setStore", "musicList", musicList);//关闭前保存到数据库
      ipcRenderer.send("win-close");
    }
  },
}

contextBridge.exposeInMainWorld('electronAPI', electronHandler);
