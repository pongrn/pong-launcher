// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import { loadGames, startGame } from "./constants/ipcChannels";

export const filesApi = {
    loadGames: () => ipcRenderer.invoke(loadGames),
    startGame: (gameName: string) => ipcRenderer.invoke(startGame, gameName)
}

contextBridge.exposeInMainWorld("filesApi", filesApi)