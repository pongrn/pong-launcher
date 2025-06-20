import { ipcRenderer, IpcRendererEvent } from "electron";
import React, { createContext, JSX, useEffect, useState } from "react";
import { loadGames, loadGamesResponse } from "./constants/ipcChannels";
import { GameInfo } from "./helpers/loadingFunctions";
import { GameListing } from "./components/GameListing";
import GamePage from "./components/GamePage";

export const StartGameContext = createContext(() => {})

export function HomePage(){
    const [gameList, setGameList] = useState<GameInfo[]>([])
    const [currentGame, setCurrentGame] = useState(0)

    console.log(currentGame)
    
    function SetupState(games: any)
    {
        if(gameList.length <= 0)
        {
            console.log(games);
            setGameList(games)
        }
    }

    if(gameList.length <= 0)
    {
        let data = window.filesApi.loadGames().then(SetupState)
        return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#8d41df", height: "100vh"}}>
            <h1 style={{fontFamily: "sans-serif", color: "#24bf36", fontSize: "3rem"}}>Carregando jogos...</h1>
        </div>)
    }

    let components = gameList.map((game, index) => {
        return (<GameListing cardStream={game.coverCardStream} name={game.name} onClick={() => setCurrentGame(index)} />)
    });

    let currentGamePage = 
    <GamePage game={gameList[currentGame]}/>

    function StartGame() //TODO: use something to manage game switching i.e Redux, useContext etc
    {
        window.filesApi.startGame(gameList[currentGame].fullExecutablePath)
    }
    
    return (
        <StartGameContext.Provider value={StartGame}>
            <div style={{marginTop: 0, display: "flex", alignItems: "start", justifyContent: "left", width: "auto", backgroundColor: "#8d41df", overflow: "hiden"}}>
                <ul style={{margin: 0, padding: 0, width: "20vw", height: "100vh", overflowX: "hidden", overflowY: "auto"}}>
                    {components}
                </ul>
                <div>
                    {currentGamePage}
                </div>
            </div>
        </StartGameContext.Provider>
    )
    
}