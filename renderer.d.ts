export interface IElectronAPI {
  
  ipcRenderer: {
    setStoreValue: Function,
    getStoreValue: Function,
    minimizeWin: Function,
    maximizeWin: Function,
    closeWin: Function,
  },
  
}
  
declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}