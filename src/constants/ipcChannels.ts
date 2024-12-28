import { filesApi } from "../preload"

export const loadGames = "loadGames"
export const loadGamesResponse = "loadGamesResponse"
export const startGame = "startGame"

declare global {
    interface Window {filesApi: typeof filesApi}
}