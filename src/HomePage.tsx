import { ipcRenderer, IpcRendererEvent } from "electron";
import React, { JSX, useState } from "react";
import { loadGames, loadGamesResponse } from "./constants/ipcChannels";
import { GameInfo } from "./helpers/loadingFunctions";
import { GameListing } from "./components/GameListing";

export function HomePage(){
    const [gameList, setGameList] = useState<GameInfo[]>([])

    let currentGame = 0;
    
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

    let components = gameList.map((game) => {
        return (<GameListing cardStream={game.coverCardStream} name={game.name} />)
    });

    let descriptionComponents = gameList[currentGame].description.map((d) => {
        return (<p>{d}</p>);
    })

    function StartGame() //TODO: use something to manage game switching i.e Redux, useContext etc
    {
        window.filesApi.startGame(gameList[currentGame].fullExecutablePath)
    }
    
    return (
        <div style={{marginTop: 0, marginLeft: "2vw", display: "flex", justifyContent: "left", width: "auto", height: "100vh"}}>
            <ul style={{margin: 0, padding: 0}}>
                {components}
            </ul>
            <div style={{backgroundColor: gameList[currentGame].bgColor, height: "auto"}}>
                {descriptionComponents}
                <button style={{height: "2.5rem", width: "6rem", fontSize: "16px"}} onClick={StartGame}>Jogar</button>
            </div>
        </div>
    )
    
}