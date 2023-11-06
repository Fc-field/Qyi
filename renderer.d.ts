export interface IElectronAPI {
  
  ipcRenderer: {
    setStoreValue: Function,
    getStoreValue: Function,
  },
  
}
  
declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}