import React, { useContext } from 'react'
import { GameInfo } from '../helpers/loadingFunctions'
import styles from "./GamePage.module.css"
import { StartGameContext } from '../HomePage'

interface GamePageProps {
    game?: GameInfo
}

function GamePage(props: GamePageProps) {
    const StartGame = useContext(StartGameContext)

    if(!props.game)
    {
        return(
            <div>
                <p>Olá! Esse é o PongLauncher. Bem vindo!</p>
            </div>
        )
    }

  return (
    <div className={styles.gamePage} style={{backgroundColor: props.game.bgColor, color: props.game.textColor}}>
        <div className={styles.header}>
        <div className={styles.foreground} style={{background: "linear-gradient(0deg, " + props.game.bgColor + "ff 25%, rgba(255, 255, 255, 0) 50%)"}}>

            <h1 style={{color: props.game.textColor}}>{props.game.name}</h1>
            <button style={{ height: "2.5rem", width: "6rem", fontSize: "16px"}} onClick={StartGame}>Jogar</button>
        </div>

            {
                props.game.bgCoverStream? 
                (
                    <img src={"data:image/jpg;base64," + props.game.bgCoverStream} />
                )
                :
                (
                    <div style={{height: "300px"}}>
                        
                    </div>
                )
            }
        </div>

        <div className={styles.page}>
            {
                props.game.description.map((d) => {
                    return (<p>{d}</p>);
                })
            }

            <div className={styles.screenshots}>
                {
                    props.game.screenshotsStreams.map((e) => {
                        return (<img src={"data:image/jpg;base64," + e} />)
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default GamePage